import {ProductSlider} from "@/ui/pages/product/component/ProductSlider";
import {CategoriesCard} from "@/ui/pages/catalog/component/CategoriesCard";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/ui/hooks/useAuth";
import {createAxiosInstance} from "@/infrastructure/client/AxiosClient";
import {Product} from "@/domain/entities/product/Product";


const sampleProducts: Product[] = [
    { id: "1", name: 'Наушники', price: 3990, image: ['/images/headphones.jpg'] },
    { id: "2", name: 'Футболка', price: 1290, image: ['/images/tshirt.jpg'] },
    { id: "3", name: 'Сковорода', price: 990, image: ['/images/pan.jpg'] },
    { id: "4", name: 'Рюкзак', price: 2290, image: ['/images/backpack.jpg'] },
    { id: "5", name: 'Кофеварка', price: 4990, image: ['/images/coffee.jpg'] },
];


export function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const axios = React.useMemo(() =>
        createAxiosInstance(auth), [auth]);

    useEffect(() => {
        axios.get("/catalog/categories/")
            .then((response) => {
                setCategories(response.data);
        }).finally(() => setLoading(false));
    }, [axios]);

    return (
        <div className="container mx-auto px-4 py-6">
            {loading ? (
                <p>Загрузка категорий...</p>
            ) : (
                <CategoriesCard categories={categories} />
            )}
            <ProductSlider products={sampleProducts} title="🔥 Популярные товары" />
        </div>
    );
}