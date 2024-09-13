"use client";
import { useMutation } from "@tanstack/react-query";
import { Button, buttonVariants } from "../ui/button";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";
import { addToCart } from "@/db/actions";

interface ProductButtonsProps {
  optionId: string;
  productId: string;
  quantity: number;
}

const ProductButtons = ({
  productId,
  quantity,
  optionId,
}: ProductButtonsProps) => {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (user?.id) {
        const data = await addToCart({
          userId: user.id,
          productId,
          optionId,
          quantity,
        });
        if (data?.success) {
          toast({
            title: data.message,
            description: "Go to cart to view item",
            action: (
              <ToastAction
                altText="redirect to cart"
                onClick={() => router.push("/cart")}
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                View cart
              </ToastAction>
            ),
          });
          return;
        }
      } else {
        let existingItems = localStorage.getItem("cart");
        const ismatch = existingItems?.includes(
          `${productId}_${optionId}_${quantity}?`
        );
        if (ismatch) {
          toast({
            title: "Item Already in cart",
            description: "Go to cart to view item",
            action: (
              <ToastAction
                altText="redirect to cart"
                onClick={() => router.push("/cart")}
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                View cart
              </ToastAction>
            ),
          });
          return;
        }
        let cartItems = `${productId}_${optionId}_${quantity}?`;
        if (existingItems) {
          let ex = JSON.parse(existingItems!);
          cartItems += ex;
        }
        localStorage.setItem("cart", JSON.stringify(cartItems));
        toast({
          title: "Item Added to cart!",
          description: "Go to cart to view items",
          action: (
            <ToastAction
              altText="redirect to cart"
              onClick={() => router.push("/cart")}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              View cart
            </ToastAction>
          ),
        });
      }
    },
  });

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Button
        variant="outline"
        className="w-full"
        size="lg"
        onClick={() => mutate()}
      >
        Add to cart
      </Button>
      <Button className="w-full" size="lg">
        Buy it now
      </Button>
    </div>
  );
};

export default ProductButtons;
