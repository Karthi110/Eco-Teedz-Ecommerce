"use client";
import CartItem from "@/components/cartItem";
import MaxWidthWrapper from "@/components/root/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteCartItem, fetchCartByUser } from "@/db/actions";
import { SignedOut, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

interface Prop {
  productId: string;
  optionId: string;
  quantity: number;
}

const CartPage = () => {
  const client = useQueryClient();
  const [products, setProducts] = useState<Prop[]>([]);
  const [amount, setAmount] = useState(0);
  const { user } = useUser();
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      if (user) {
        fetchCartByUser().then((data) => setProducts(data!));
        return { success: true };
      } else {
        let cartItems = localStorage.getItem("cart");
        if (!cartItems) return;
        const items = cartItems.split(/(\w+_\w+_\d+\?)/g);
        if (!items) return;
        const results = items
          .map((input) => {
            const match = input.match(/(\w+)_(\w+)_(\d+)\?/);
            if (match) {
              return {
                productId: match[1],
                optionId: match[2],
                quantity: Number(match[3]),
              };
            }
            return null;
          })
          .filter((item): item is Prop => item !== null);
        setProducts(results);
        return { success: true };
      }
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Item Removed from cart",
      });
    },
    onError: () =>
      toast({
        title: "Failed to remove Item",
        variant: "destructive",
      }),
  });

  const handleDelete = ({
    productId,
    optionId,
    quantity,
    price,
  }: {
    productId: string;
    optionId: string;
    price: number;
    quantity: number;
  }) => {
    if (user) {
      deleteItem({ optionId, productId, userId: user.id });
    } else {
      let cartItems = localStorage.getItem("cart");
      let updatedCart = cartItems?.replace(
        new RegExp(`${productId}_${optionId}_${quantity}\\?`, "g"),
        ""
      );
      console.log(updatedCart);
      if (!updatedCart) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", updatedCart!);
      }
      setAmount(amount - price);
      client.invalidateQueries({ queryKey: ["cart"] });
    }
  };

  return (
    <MaxWidthWrapper className="flex flex-col items-start py-10 w-full">
      {products.length !== 0 ? (
        <div className="flex flex-col lg:flex-row relative w-full p-2 gap-4">
          <div className="flex flex-1 flex-col w-full border-2 rounded-md p-4">
            <div className="flex items-center justify-between  border-b-2 p-3">
              <h1 className="text-2xl font-semibold">Product Cart</h1>
              <Link href="/collections" className={buttonVariants()}>
                Continue shoping..
              </Link>
            </div>
            {products.map((product, idx) => (
              <CartItem
                key={idx}
                quantity={product.quantity}
                productId={product.productId}
                optionId={product.optionId}
                amount={amount}
                setAmount={setAmount}
                handleDelete={handleDelete}
              />
            ))}
            <h2 className=" p-2 w-full text-right text-lg">
              Subtotal({products.length} items):<b>Rs.{amount}/-</b>
            </h2>
          </div>
          <div className="flex-[0.3] sticky top-20  flex flex-col gap-4 items-start p-4 border-2 rounded-md h-fit w-full">
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <h1>Total Number of products:{products.length}</h1>
              <h2>
                SubTotal:<b>Rs.{amount}/-</b>
              </h2>
            </div>
            <Button className="w-full">Proceed to buy</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <h1 className="text-6xl">Nothing Here !</h1>
          <Link
            href="/collections"
            className={buttonVariants({ className: "mt-2" })}
          >
            Continue shoping.
          </Link>
          <SignedOut>
            <p>----Or----</p>
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "ghost" })}
            >
              Sign In to Load Cart.
            </Link>
          </SignedOut>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default CartPage;
