import { Product } from "@/domain/entities/product/Product";

export interface ProductRepository {
    fetchAll(): Promise<Product[]>;
    fetchById(id: string): Promise<Product | null>;
}
