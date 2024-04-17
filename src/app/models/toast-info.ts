import { ToastType } from "../enums/toast-type";

export class ToastInfo {
    public header: string;
    public body: string;
    public delay: number | undefined;
    public type: ToastType;

    constructor(
        header: string,
        body: string,
        type: ToastType
    ) {
        this.header = header;
        this.body = body;
        this.type = type;
    } 
}