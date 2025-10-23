export class Product {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly price: number,
        public readonly chapterId: string,
        public readonly image: string[]
    ) {}
}