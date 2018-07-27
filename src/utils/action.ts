// tslint:disable:max-classes-per-file

export abstract class PlainAction {
    public abstract readonly type: any;
    constructor() {
        return Object.assign({}, this);
    }
}

export abstract class ActionWithPayload<P extends object = any> extends PlainAction {
    constructor(public readonly payload: P) {
        super();
    }
}
