"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import CartProps from "@/app/interfaces/props/CartProps";

export default function CheckoutNow(
  { currency, description, image, name, price, sku }: CartProps) {
  const { checkoutSingleItem } = useShoppingCart();

  const buyNow = (priceId: string) => checkoutSingleItem(priceId);

  const product = { name, description, price, currency, image, sku };

  return (
    <Button variant="outline" onClick={() => buyNow(product.sku) }>
      Checkout Now
    </Button>
  );
}
