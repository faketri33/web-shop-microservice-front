import {IProductRepository} from "@/infrastructure/product/IProductRepository";
import {Product} from "@/domain/entities/product/Product";

export class ProductService implements IProductRepository {

    private readonly repo: IProductRepository;

    constructor(repo: IProductRepository) {
        this.repo = repo;
    }

    fetchAll(): Promise<Product[]> {
        return this.repo.fetchAll();
    }

    fetchById(id: string): Promise<Product | null> {
        return this.repo.fetchById(id);
    }
}