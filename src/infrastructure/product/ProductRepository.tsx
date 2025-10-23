import { Product } from "@/domain/entities/product/Product";
import {IProductRepository} from "@/infrastructure/product/IProductRepository";
import {AxiosInstance} from "axios";

const sampleProducts: Product[] = [
    { id: "1", name: 'Наушники', price: 3990, chapterId: "", image: ['/images/headphones.jpg'] },
    { id: "2", name: 'Футболка', price: 1290, chapterId: "", image: ['/images/tshirt.jpg'] },
    { id: "3", name: 'Сковорода', price: 990, chapterId: "", image: ['/images/pan.jpg'] },
    { id: "4", name: 'Рюкзак', price: 2290, chapterId: "", image: ['/images/backpack.jpg'] },
    { id: "5", name: 'Кофеварка', price: 4990, chapterId: "", image: ['/images/coffee.jpg'] },
];

export class ProductRepository implements IProductRepository {

    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    fetchAll(): Promise<Product[]> {
        return Promise.resolve(sampleProducts);
    }
    fetchById(id: string): Promise<Product | null> {
        const found = sampleProducts.find((product) => product.id === id) || null;
        return Promise.resolve(found);
    }
}