import { products } from "@/data/products";
import { ProductCard } from "@/products";

export const metadata = {
    title: 'Products page',
    description: 'Products page',
};
export default function ProductsPage() {

    const productsList = products;

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-2">
                {productsList.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}