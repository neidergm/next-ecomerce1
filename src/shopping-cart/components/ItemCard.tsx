'use client';

import type { Product } from "@/data/products"
import Image from "next/image";

import { IoAddCircleOutline, IoRemove } from "react-icons/io5";
import { addProductToCart, removeProductItemFromCart } from "../actions/cart-actions";

import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  quantity: number;
}


export const ItemCard = ({ product, quantity }: Props) => {

  const router = useRouter();

  function onAddToCart() {
    addProductToCart(product.id);
    router.refresh();
  }

  function onRemoveItem() {
    removeProductItemFromCart(product.id);
    router.refresh();
  }

  return (
    <div className="flex items-center shadow rounded-lg w-full bg-gray-800 border-gray-100">

      {/* Product Image */}
      <div className="p-2">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={product.image}
          alt={product.name} />
      </div>

      {/* Title */}
      <div className="px-5 pb-5 w-full flex flex-col mt-2">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight text-white">
            {product.name}
          </h3>
        </a>

        {/* Price and Add to Cart */}
        <div className="flex flex-col items-start justify-between">

          <span className="text-gray-900 dark:text-gray-300">
            Precio: ${product.price}
          </span>
          <span className="font-bold text-gray-300">
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex p-5 items-center justify-center">
        <button
          onClick={onAddToCart}
          className="text-blue-500 mr-2 py-1 bg-blue-50 hover:bg-blue-800 focus:ring-0 font-medium rounded-lg text-sm px-3  text-center dark:bg-blue-900 dark:hover:bg-blue-800"
        >
          <IoAddCircleOutline size={25} />
        </button>
        <span className="text-2xl text-white mx-8">{quantity}</span>
        <button
          onClick={onRemoveItem}
          className="text-red-500 mr-2 py-1 bg-red-50 hover:bg-red-800 focus:ring-0 font-medium rounded-lg text-sm px-3  text-center dark:bg-red-900 dark:hover:bg-red-800"
        >
          <IoRemove size={25} />
        </button>
      </div>
    </div>
  )
}