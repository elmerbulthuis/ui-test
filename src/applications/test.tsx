import { Router } from "goodrouter";
import { createBrowserHistory, History, Location } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { DisposableComposition } from "using-disposable";
import * as middleware from "../middleware";
import { ApplicationState, reduceApplicationState } from "../reducers";
import * as routes from "../routes";

export interface TestApplicationConfig {
    rootPath: string;
}

export class TestApplicationClient extends DisposableComposition {
    public router!: Router;
    private history!: History;
    private store!: Store<ApplicationState>;
    private renderCount = 0;

    constructor(
        protected window: Window,
        private element: HTMLElement,
        private config: TestApplicationConfig,
    ) {
        super();
    }

    public async run() {
        this.router = this.createRouter();
        this.history = this.createHistory();
        this.store = this.createStore();

        const { history } = this;

        await this.render(history.location, "INIT");
        this.registerDisposable({
            dispose: () => { ReactDOM.unmountComponentAtNode(this.element); },
        });
    }

    public async isRendering() {
        return this.renderCount > 0;
    }

    public async render(location: Location, action: string) {
        this.renderCount++;
        try {
            const { router, element, history, store } = this;
            const component = await router.transition(location.pathname, {
                application: this,
                action,
                history,
                store,
            });
            if (!component) return;

            await new Promise(resolve => ReactDOM.render(
                <Provider store={store}>{component}</Provider>,
                element,
                resolve,
            ));
        }
        finally {
            this.renderCount--;
        }
    }

    protected createRouter() {
        const routeList = [
            routes.createAuthorizedContextRoute(),
            routes.createHomeRoute(),
            routes.createLoginRoute(),
        ];
        const router = new Router(routeList);
        return router;
    }

    private createHistory() {
        const { config } = this;
        const history = createBrowserHistory({
            basename: config.rootPath,
        });
        this.registerDisposable({
            dispose: history.listen((location, action) => this.render(location, action)),
        });
        return history;
    }

    private createStore() {
        const middlewareList = new Array<Middleware>();
        middlewareList.push(
            middleware.createAuthorizationMiddleware(),
            middleware.createNavigationMiddleware(this.router, this.history),
        );
        const store = createStore(
            reduceApplicationState,
            applyMiddleware(...middlewareList),
        );
        return store;
    }

}
