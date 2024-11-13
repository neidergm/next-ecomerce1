'use client';
// https://tailwindcomponents.com/component/e-commerce-product-card

import Image from "next/image"
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5"
import { Start } from "./Start";
import { useRouter } from "next/navigation";
import { addProductToCart, removeProductFromCart } from "@/shopping-cart";

type Props = {
    id: string;
    name?: string;
    price?: number;
    image?: string;
    rating?: number;
}

export const ProductCard = ({ image, rating, price, name, id }: Props) => {

    const router = useRouter();

    const onAddToCart = (id: string) => {
        addProductToCart(id);
        router.refresh();
    }

    const onRemoveFromCart = (id: string) => {
        removeProductFromCart(id);
        router.refresh();
    }

    return (
        <div className="bg-white shadow rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-100">

            {/* Product Image */}
            <div className="p-2">
                <Image
                    width={500}
                    height={500}
                    className="rounded"
                    src={image ?? "/images/products/1623735-00-A_0_2000.jpg"}
                    alt="product image" />
            </div>

            {/* Title */}
            <div className="px-5 pb-5">
                <a href="#">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{name}</h3>
                </a>
                <div className="flex items-center mt-2.5 mb-5">

                    {/* Stars */}
                    {Array(rating).fill(0).map((_, i) => (<Start key={i} />))}
                    {/* Rating Number */}

                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        {rating?.toFixed(1)}
                    </span>
                </div>


                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${price?.toFixed(2)}</span>

                    <div className="flex">
                        <button
                            onClick={() => onAddToCart(id)}
                            className="text-blue-500 mr-2 py-1 bg-blue-50 hover:bg-blue-800 focus:ring-0 font-medium rounded-lg text-sm px-4  text-center dark:bg-blue-900 dark:hover:bg-blue-800">
                            <IoAddCircleOutline size={25} />
                        </button>
                        <button
                            onClick={() => onRemoveFromCart(id)}
                            className="text-red-500 mr-2 bg-red-50 hover:bg-red-800 focus:ring-0 font-medium rounded-lg text-sm px-4  text-center dark:bg-red-900 dark:hover:bg-red-800">
                            <IoTrashOutline size={20} />
                        </button>
                    </div>

                </div>


            </div>
        </div>
    )
}