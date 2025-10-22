export type ProductId = string;

export class Product {
    constructor(
        public readonly id: ProductId,
        public readonly name: string,
        public readonly price: number,
        public readonly image: string[]
    ) {}
}