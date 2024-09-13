import ProductInfo from "@/components/product/product-info";
import MaxWidthWrapper from "@/components/root/max-width-wrapper";

import { fetchProductById } from "@/db/actions";

interface ProductParams {
  params: { productId: string };
}

const ProductIdPage = async ({ params }: ProductParams) => {
  const product = await fetchProductById(params.productId);

  if (!product) return null;

  return (
    <MaxWidthWrapper className="py-10">
      {product.Variant.length === 0 ? (
        <ProductInfo product={product} />
      ) : (
        <ProductInfo product={product} variants={product.Variant} />
      )}
    </MaxWidthWrapper>
  );
};

export default ProductIdPage;
