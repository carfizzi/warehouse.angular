export class Order {
    public id: number | undefined;
    public packaging_code_ext: string;
    public insertion_date: Date;
    public quantity: number = 1;

    constructor(packaging_code_ext: string, insertion_date: Date, quantity: number, id: number | undefined = undefined) {
        this.id = id;
        this.packaging_code_ext = packaging_code_ext;
        this.insertion_date = insertion_date;
        this.quantity = quantity;
    }
}