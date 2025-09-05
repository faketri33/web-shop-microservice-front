import {ProductSlider} from "../widgets/catalog/product/ProductSlider.jsx";
import {CategoriesCard} from "../widgets/catalog/categories/CategoriesCard.jsx";
import { $axios } from "../shared/client/AxiosClient.js";
import {useEffect, useState} from "react";

const sampleProducts = [
    { id: 1, name: 'Наушники', price: '3990₽', image: '/images/headphones.jpg' },
    { id: 2, name: 'Футболка', price: '1290₽', image: '/images/tshirt.jpg' },
    { id: 3, name: 'Сковорода', price: '990₽', image: '/images/pan.jpg' },
    { id: 4, name: 'Рюкзак', price: '2290₽', image: '/images/backpack.jpg' },
    { id: 5, name: 'Кофеварка', price: '4990₽', image: '/images/coffee.jpg' },
];


export function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        $axios
            .get("/catalog/")
            .then((res) => {
                console.log(res.data);
                setCategories(res.data);
            })
            .catch((err) => console.error("Ошибка загрузки категорий:", err))
            .finally(() => setLoading(false));
    }, []);

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