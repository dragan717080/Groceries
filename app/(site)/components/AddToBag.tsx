"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import CartProps from "@/app/interfaces/props/CartProps";
import { useSession } from "next-auth/react";

export default function AddToBag({ currency, description, image, name,
  price, sku, isLargeScreen }: CartProps) {

  const { addItem, handleCartClick } = useShoppingCart();
  const session = useSession();

  const product = { name, description, price, currency, image, sku };
  

  return (
    <Button
      className={`
        ${isLargeScreen 
          ? 'text-white px-7 py-2 text-sm shadow-md rounded-full my-3 hover:shadow-xl max-w-fit active:scale-90 mt-auto transition duration-150' 
          : 'w-full flex'}
        ${session.status !== 'authenticated' ? 'bg-black' : 'bg-red-500'}`}
      onClick={() => { addItem(product), handleCartClick() }}>
      RSD {price} - Dodaj u korpu!
    </Button>
  );
}
