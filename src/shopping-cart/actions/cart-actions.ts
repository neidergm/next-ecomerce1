'use server';

import { cookies } from "next/headers";

type Cart = {
    [key: string]: number;
}

export const getCookieCart = async (): Promise<Cart> => {

    const cookieStorage = await cookies();

    if (cookieStorage.get("cart")) {
        return JSON.parse(cookieStorage.get("cart")?.value ?? "{}");
    }

    return {};
}

export const addProductToCart = async (id: string) => {
    const cart = await getCookieCart();
    if (cart[id]) {
        cart[id] = cart[id] + 1;
    } else {
        cart[id] = 1;
    }

    const cookieStorage = await cookies();
    cookieStorage.set("cart", JSON.stringify(cart));
}

export const removeProductFromCart = async (id: string) => {
    const cart = await getCookieCart();
    if (cart[id]) {
        delete cart[id];
        const cookieStorage = await cookies();
        cookieStorage.set("cart", JSON.stringify(cart));
    }
}
export const removeProductItemFromCart = async (id: string) => {
    const cart = await getCookieCart();
    if (cart[id]) {
        cart[id] = cart[id] - 1;
        if (cart[id] === 0) {
            delete cart[id];
        }
        const cookieStorage = await cookies();
        cookieStorage.set("cart", JSON.stringify(cart));
    }
}
