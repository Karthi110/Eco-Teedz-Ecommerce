"use client";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./product-card";
import { fetchProducts } from "@/db/actions";

const RelatedProducts = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });
  if (!products) return null;

  return (
    <div className="w-full flex flex-col gap-6 items-start justify-center">
      <h1 className="text-2xl font-semibold">Related Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {products.map((entry) => (
          <ProductCard
            key={entry.id}
            id={entry.id}
            imgUrl={entry.media[0]}
            title={entry.title}
            price={String(entry.price)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
