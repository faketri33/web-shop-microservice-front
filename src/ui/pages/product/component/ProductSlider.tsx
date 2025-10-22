import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from "@/ui/pages/product/component/ProductCard";
import {Product} from "@/domain/entities/product/Product";

interface ProductSliderProps {
    products: Product[];
    title: string;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({products, title}) => {
    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold leading-tight"> {title} </h2>
            <Swiper
                spaceBetween={16}
                breakpoints={{
                    320: { slidesPerView: 1.1 },
                    640: { slidesPerView: 2.2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}