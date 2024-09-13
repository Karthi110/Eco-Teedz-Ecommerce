import PaginationControls from "@/components/product/paginationControls";
import ProductCard from "@/components/product/product-card";
import MaxWidthWrapper from "@/components/root/max-width-wrapper";
import { fetchProducts } from "@/db/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Products = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "8";
  const products = await fetchProducts();
  if (!products) return null;
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const entries = products.slice(start, end);

  return (
    <MaxWidthWrapper className="px-4 py-8">
      <div className="flex flex-col items-center justify-center gap-6 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {entries.map((entry) => (
            <ProductCard
              key={entry.id}
              id={entry.id}
              imgUrl={entry.media[0]}
              title={entry.title}
              price={String(entry.price)}
            />
          ))}
        </div>
        <PaginationControls
          totalProducts={products.length}
          hasNextPage={end < products.length}
          hasPrevPage={start > 0}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default Products;
