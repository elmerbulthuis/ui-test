import * as React from "react";

export type ModelFormError<T extends object> = {
    [K in keyof T]?: boolean;
};

export type ModelFormDirty<T extends object> = {
    [K in keyof T]?: boolean;
};

export interface ModelFormProps<TModel extends object> {
    model: TModel;
}

export interface ModelFormState<TModel extends object> {
    model: TModel;
    dirty: ModelFormDirty<TModel>;
    error: ModelFormError<TModel>;
}

export abstract class ModelFormBase<TModel extends object, TProps = {}> extends React.PureComponent<
    ModelFormProps<TModel> & TProps,
    ModelFormState<TModel>> {

    constructor(props: ModelFormProps<TModel> & TProps, context: any) {
        super(props, context);

        const model = Object.assign({}, props.model);
        this.state = {
            model,
            dirty: {},
            error: this.calculateModelError(model),
        };
    }

    protected handleFieldValue = (name: string, value: any) => {
        this.updateFieldValue(name as keyof TModel, value);
    }
    protected handleFieldDone = (name: string, value: any) => {
        this.updateFieldDirty(name as keyof TModel, value);
        this.updateModelError();
    }

    protected getFieldValue(field: keyof TModel) {
        const { model } = this.state;
        return model[field];
    }

    protected getFieldValidation(field: keyof TModel) {
        const { dirty, error } = this.state;
        if (!dirty[field]) return undefined;
        return !error[field];
    }

    protected getModelErrorCount() {
        const { error } = this.state;
        return Object.keys(error).
            map(k => k as keyof TModel).
            filter(k => error[k]).
            length;
    }

    protected setModelDirty() {
        this.setState(state => {
            const dirty = Object.keys(state.model).
                reduce((o, k) => Object.assign(o, { [k]: true }), {});
            return {
                dirty,
            };
        });
    }

    protected abstract calculateModelError(model: TModel): ModelFormError<TModel>;

    private updateFieldValue(field: keyof TModel, value: any) {
        this.setState(state => {
            const model = Object.assign({}, state.model, { [field]: value });
            return {
                model,
            };
        });
    }

    private updateFieldDirty(field: keyof TModel, value: any) {
        if (this.props.model[field] === value) return;

        this.setState(state => {
            const dirty = Object.assign({}, state.dirty, { [field]: true });
            return { dirty };
        });
    }

    private updateModelError() {
        this.setState(state => {
            const { model } = state;

            return {
                error: this.calculateModelError(model),
            };
        });
    }

}
