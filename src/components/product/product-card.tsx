import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  imgUrl: string;
  OrgPrice?: string;
  price: string;
  id?: string;
}

const ProductCard = ({
  imgUrl,
  price,
  title,
  OrgPrice,
  id,
}: ProductCardProps) => {
  return (
    <Card className="w-[250px] h-[320px] flex flex-col items-center overflow-hidden justify-center shadow-sm">
      <CardHeader>
        <Link
          href={`/collections/${id}`}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-[230px] h-[250px] relative">
            <Image
              src={imgUrl}
              width={1080}
              height={1136}
              alt="product image"
              priority
              className="transform transition duration-500 hover:scale-110 hover:border-none border-2 rounded-md border-dashed p-2 object-contain bg-muted"
            />
          </div>
          <h1 className="capitalize text-lg hover:underline">{title}</h1>
          <div className="flex items-center justify-center gap-1">
            {OrgPrice ? <p className="line-through">Rs. {OrgPrice}</p> : null}
            <p>from Rs.{price}</p>
          </div>
        </Link>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
