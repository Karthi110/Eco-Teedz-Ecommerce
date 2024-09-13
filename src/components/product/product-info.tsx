"use client";
import { Product, Variant, VariantOptions } from "@prisma/client";
import { Button, buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import { fetchByOption, fetchOptions } from "@/db/actions";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import ProductButtons from "./product-buttons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ImageSlider from "../product/imageSlider";
import LoadingPage from "../root/loading-page";
import RelatedProducts from "./related-products";

const ProductInfo = ({
  product,
  variants,
}: {
  product: Product;
  variants?: Variant[];
}) => {
  const [variant, setVariant] = useState<VariantOptions>();
  const [option, setOption] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { mutate: getInitialData } = useMutation({
    mutationFn: async () => {
      if (variants) {
        const options = await fetchOptions(product.id);
        if (!options) return;
        setOption(options[0].option);
        setVariant(options[0]);
      }
      setIsLoading(false);
    },
  });
  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const { mutate: getOption } = useMutation({
    mutationFn: fetchByOption,
    onSuccess: (data) => {
      if (!data) return;
      setVariant(data);
    },
  });
  if (isLoading) return <LoadingPage />;

  return (
    <>
      <div className="py-6 flex flex-col md:flex-row items-start justify-center w-full gap-12">
        <div className="flex-1 flex relative lg:sticky md:top-6 justify-center w-full">
          {/* TODO:Make variant media show when changed  */}
          <ImageSlider imgUrls={product.media} />
        </div>
        <div className="flex flex-1 flex-col items-start justify-center gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">EcoTeedz</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/collections">collections</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary capitalize leading-tight">
            {product.title}
          </h1>
          <div className="text-base lg:text-xl font-medium flex gap-3 items-center justify-center leading-tight">
            {product.comparePrice ? (
              <p className="text-sm line-through">Rs. {product.comparePrice}</p>
            ) : null}
            {variant ? (
              <>
                <p>Rs. {variant.price}</p>
                {product.comparePrice! > variant.price ? (
                  <Badge>Sale</Badge>
                ) : null}
              </>
            ) : (
              <>
                <p>Rs. {product.price}</p>
                {product.comparePrice! > product.price ? (
                  <Badge>Sale</Badge>
                ) : null}
              </>
            )}
          </div>
          {variants
            ? variants.map((variant, idx) => (
                <div
                  key={variant.id}
                  className="flex flex-col items-start justify-center gap-2"
                >
                  <h2 className="text-base lg:text-lg font-medium leading-tight">
                    {variant.name}
                  </h2>
                  <ul className="flex items-center justify-center gap-2">
                    {variant.options.map((opt) => (
                      <Button
                        variant="outline"
                        key={opt}
                        onClick={() => {
                          option[idx] = opt;
                          setOption(option);
                          getOption({ option, productId: product.id });
                        }}
                        className={cn(
                          "text-sm md:text-base",
                          idx === 0 &&
                            buttonVariants({ size: "icon", variant: "ghost" }),
                          option[idx] === opt &&
                            buttonVariants({
                              className: "hover:text-secondary",
                            })
                        )}
                      >
                        {opt}
                      </Button>
                    ))}
                  </ul>
                </div>
              ))
            : null}
          <div className="flex flex-col items-start justify-center gap-2 mb-3">
            <h2 className="text-base md:text-lg font-medium leading-tight">
              Quantity
            </h2>
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-r-none"
                onClick={() => setQuantity(quantity - 1)}
                disabled={quantity === 1}
              >
                -
              </Button>
              <Input
                readOnly
                maxLength={1}
                className={buttonVariants({
                  size: "icon",
                  className: "rounded-none",
                  variant: "outline",
                })}
                value={quantity}
              />
              <Button
                variant="outline"
                size="icon"
                className="rounded-l-none"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity === 9}
              >
                +
              </Button>
            </div>
          </div>
          <ProductButtons
            productId={product.id}
            optionId={variant?.id || "none"}
            quantity={quantity}
          />
          <div>
            <h2 className="text-base  md:text-lg font-medium leading-tight">
              Product Details
            </h2>
            <p className="text-xs md:text-base text-muted-foreground leading-snug">
              {product.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Vero optio eaque maiores velit harum, possimus
              iusto, cupiditate magni illo nulla, odit dolor eius suscipit alias
              labore assumenda vel tempore quos officia. Illum architecto
              reiciendis fuga sequi atque consequatur nemo, iure illo nobis
              officiis? Labore cum magnam, in consectetur aliquid fuga sunt
              blanditiis, quo corporis itaque reprehenderit quae quaerat. Ut
              quibusdam id nostrum modi vero voluptatum. Numquam amet rem
              corrupti rerum nam sed, odio ut doloremque repellat, quisquam
              eaque nesciunt accusamus at facilis et aliquid inventore error
              voluptatibus adipisci? Delectus cum voluptates sit, placeat quasi
              atque modi ipsum a perferendis ipsam!
            </p>
          </div>
        </div>
      </div>
      <RelatedProducts />
    </>
  );
};

export default ProductInfo;
