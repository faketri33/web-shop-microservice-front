import {useContext} from "react";
import {ServicesContext} from "@/infrastructure/client/ServiceContext";

export function useProductService(){
    const service = useContext(ServicesContext);
    return service.getProductsUseCase;
}