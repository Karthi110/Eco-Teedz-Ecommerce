import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchCartItems } from "@/db/actions";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface cartItemProps {
  productId: string;
  optionId: string;
  quantity: number;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  handleDelete: ({
    productId,
    optionId,
    price,
    quantity,
  }: {
    productId: string;
    optionId: string;
    price: number;
    quantity: number;
  }) => void;
}

const CartItem = ({
  productId,
  quantity: q,
  optionId,
  amount,
  setAmount,
  handleDelete,
}: cartItemProps) => {
  const [quantity, setQuantity] = useState<number>(q);
  const [initilizing, setInitilizing] = useState<boolean>(true);
  const { data, isLoading } = useQuery({
    queryKey: [`${productId}${optionId}`],
    queryFn: () => fetchCartItems({ productId, optionId }),
  });

  if (isLoading) {
    return (
      <div className="w-full h-28 flex items-start bg-gray-200 animate-pulse p-2 gap-10 rounded-sm">
        <div className="w-28 h-full bg-gray-300 rounded-md" />
        <div className="flex flex-1 w-full h-full flex-col justify-center gap-4">
          <div className="w-[70%] h-[20%] bg-gray-300 rounded-sm" />
          <div className="w-[50%] h-[20%] bg-gray-300 rounded-sm" />
        </div>
        <div className="flex flex-[.2] w-full h-full flex-col justify-center gap-4">
          <div className="w-[70%] h-[20%] bg-gray-300 rounded-sm" />
          <div className="w-[50%] h-[20%] bg-gray-300 rounded-sm" />
        </div>
      </div>
    );
  }
  if (!data) return null;

  const UpdateAmount = (price: number, symbol: string) => {
    if (symbol === "") {
      if (initilizing) {
        if (data.option) {
          setAmount(amount + data.option.price * quantity);
        } else {
          setAmount(amount + data.product?.price! * quantity);
        }
        setInitilizing(false);
      }
    } else if (symbol === "-") {
      setAmount(amount - price);
    } else {
      setAmount(amount + price);
    }
  };

  return (
    <div className="flex gap-10 items-center justify-between w-full border-b-2 border-dashed p-2">
      <Image
        src={data.product?.media[0]!}
        alt="productImage"
        width={1200}
        height={1180}
        className="w-32 border-2 rounded-sm p-2"
        onLoad={() => UpdateAmount(0, "")}
      />
      <div className="flex flex-1 flex-col items-start gap-2">
        <Link
          className="text-xl font-semibold text-primary tracking-tight hover:underline"
          href={`/collections/${productId}`}
        >
          {data.product?.title}
        </Link>
        {data.option ? (
          <p className="text-xs">variant: {data.option?.option}</p>
        ) : null}
        <div className="flex flex-col items-start justify-center gap-2 mb-3">
          <h3 className="text-sm font-medium leading-tight">Quantity</h3>
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="rounded-r-none"
              onClick={() => {
                setQuantity(quantity - 1);
                if (data.option) {
                  UpdateAmount(data.option.price, "-");
                } else {
                  UpdateAmount(data.product?.price!, "-");
                }
              }}
              disabled={quantity === 1}
            >
              -
            </Button>
            <Input
              readOnly
              maxLength={1}
              className={buttonVariants({
                size: "sm",
                className: "rounded-none w-8",
                variant: "ghost",
              })}
              value={quantity}
            />
            <Button
              variant="outline"
              size="sm"
              className="rounded-l-none"
              onClick={() => {
                setQuantity(quantity + 1);
                if (data.option) {
                  UpdateAmount(data.option.price, "+");
                } else {
                  UpdateAmount(data.product?.price!, "+");
                }
              }}
              disabled={quantity === 9}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-[.2] flex-col items-start justify-center gap-2">
        <div>
          <h2 className="text-base font-medium">Price</h2>
          {data.option ? (
            <p className="font-bold">Rs. {data.option.price * quantity}</p>
          ) : (
            <p className="font-bold">Rs. {data.product?.price! * quantity}</p>
          )}
        </div>
        <div className=" flex items-center justify-center">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (data.option) {
                handleDelete({
                  productId,
                  optionId,
                  price: data.option.price,
                  quantity: q,
                });
              } else {
                handleDelete({
                  productId,
                  optionId,
                  price: data.product?.price! * quantity,
                  quantity: q,
                });
              }
            }}
          >
            Remove
            <Trash2 className="w-4 h-4 ml-[1px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
