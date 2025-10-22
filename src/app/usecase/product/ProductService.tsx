import {ProductRepository} from "@/infrastructure/product/ProductRepository";
import {Product} from "@/domain/entities/product/Product";


export class ProductService implements ProductRepository {
    fetchAll(): Promise<Product[]> {
        return Promise.resolve([]);
    }

    fetchById(id: string): Promise<Product | null> {
        return Promise.resolve(null);
    }
}