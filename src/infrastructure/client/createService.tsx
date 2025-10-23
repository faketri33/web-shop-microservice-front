import {createAxiosInstance} from "@/infrastructure/client/axios/AxiosClient";
import {ProductRepository} from "@/infrastructure/product/ProductRepository";
import {ProductService} from "@/app/usecase/product/ProductService";
import {IProductRepository} from "@/infrastructure/product/IProductRepository";

export function createServices(auth: any) {
    const axios = createAxiosInstance(auth);

    const cache: Record<string, any> = {};

    return {
        get axios() { return axios; },

        get productRepo(): IProductRepository {
            if (!cache.productRepo) cache.productRepo = new ProductRepository(axios);
            return cache.productRepo;
        },

        get getProductsUseCase(): ProductService {
            if (!cache.getProductsUseCase) cache.getProductsUseCase = new ProductService(this.productRepo);
            return cache.getProductsUseCase;
        },

        __internal_cache: cache
    };
}