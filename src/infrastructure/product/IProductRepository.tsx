import { Product } from "@/domain/entities/product/Product";

export interface IProductRepository {
    fetchAll(): Promise<Product[]>;
    fetchById(id: string): Promise<Product | null>;
}
