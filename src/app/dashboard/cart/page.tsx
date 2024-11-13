import { products, type Product } from "@/data/products";
import { getCookieCart, ItemCard } from "@/shopping-cart";

type ProductInCart = {
    product: Product;
    quantity: number;
}

const getProductsInCart = async () => {
    const cart = await getCookieCart();

    return Object.entries(cart)
        .reduce<ProductInCart[]>((p, [id, quantity]) => {
            const product = products.find(p => p.id === id);

            if (product) {
                p.push({ product, quantity })
            }

            return p;
        }, []);
}

const getTotalPrice = (productsInCart: ProductInCart[]) => {
    return productsInCart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
}

export default async function CartPage() {

    const productsInCart = await getProductsInCart();
    const totalPrice = getTotalPrice(productsInCart);

    return (
        <div>
            <h1 className="text-5xl">Products in cart</h1>

            <hr className="my-5" />
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {productsInCart.map(({ product, quantity }) =>
                        <ItemCard key={product.id} product={product} quantity={quantity} />
                    )}
                </div>
                <div className="flex flex-col sm:w-4/12">
                    <div className="bg-white p-4 rounded-lg text-center h-56">
                        <h2 className="text-3xl">Total</h2>
                        <hr className="my-3" />
                        <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
                        <p className="text-sm mt-5 text-gray-500">
                            impuestos 15%
                            <span className="block">
                                ${(totalPrice * 0.15).toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}