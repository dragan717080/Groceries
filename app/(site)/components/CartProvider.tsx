"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      cartMode="client-only"
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}
