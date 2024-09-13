"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from ".";

export const fetchProducts = async () => {
  const products = await db.product.findMany({});
  if (products) return products;
  return [];
};

export const fetchProductById = async (productId: string) => {
  const product = await db.product.findFirst({
    where: { id: productId },
    include: {
      Variant: true,
    },
  });
  if (!product) return null;
  return product;
};

export const fetchOptions = async (productId: string) => {
  const options = await db.variantOptions.findMany({ where: { productId } });
  if (!options) return null;
  return options;
};

export const fetchByOption = async ({
  option,
  productId,
}: {
  option: string[];
  productId: string;
}) => {
  const options = await db.variantOptions.findMany({ where: { productId } });
  for (const opt of options) {
    if (JSON.stringify(opt.option) === JSON.stringify(option)) {
      return opt;
    }
  }
  return null;
};

export const addToCart = async ({
  userId,
  productId,
  optionId,
  quantity,
}: {
  userId: string;
  productId: string;
  optionId: string;
  quantity: number;
}) => {
  try {
    const existingItem = await db.cart.findFirst({
      where: { userId, optionId, productId },
    });
    if (existingItem) {
      await db.cart.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
    } else {
      await db.cart.create({
        data: {
          userId,
          productId,
          quantity,
          optionId,
        },
      });
    }
    return { success: true, message: "Item added to cart" };
  } catch (err) {
    console.log(err);
  }
};

export const fetchCartByUser = async () => {
  const user = await currentUser();
  if (!user) return;
  const data = await db.cart.findMany({
    where: { userId: user.id },
    select: { productId: true, optionId: true, quantity: true },
  });
  return data;
};

export const fetchCartItems = async ({
  productId,
  optionId,
}: {
  productId: string;
  optionId: string;
}) => {
  const product = await db.product.findFirst({ where: { id: productId } });
  if (optionId !== "none") {
    const option = await db.variantOptions.findFirst({
      where: { id: optionId },
    });
    return { product: product, option: option };
  }
  return { product: product };
};

export const deleteCartItem = async ({
  optionId,
  productId,
  userId,
}: {
  productId: string;
  optionId: string;
  userId: string;
}) => {
  try {
    const item = await db.cart.findFirst({
      where: { userId, productId, optionId },
    });
    if (!item) {
      throw new Error("No item found");
    }
    await db.cart.delete({ where: { id: item.id } });
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete");
  }
};
