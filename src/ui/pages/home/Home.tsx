import {ProductSlider} from "@/ui/pages/product/component/ProductSlider";
import {useProductService} from "@/ui/hooks/useProduct";
import {ProductService} from "@/app/usecase/product/ProductService";
import {Product} from "@/domain/entities/product/Product";
import {useEffect, useState} from "react";


export function Home() {
    const productsService = useProductService();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productsService.fetchAll().then(data => {
            setProducts(data);
        }).finally(() => setLoading(false));
    }, [productsService]);

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="container mx-auto px-4 py-6">
            <ProductSlider products={products} title="🔥 Популярные товары" />
        </div>
    );
}