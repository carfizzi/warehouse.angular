export class TotalOrder {
    public type: string;
    public total: number;

    constructor(type: string, total: number) {
        this.type = type
        this.total = total
    }
}