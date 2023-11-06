import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children, ...props }: any) {
  return (
    <USCProvider {...props}>
      {children}
    </USCProvider>
  );
}
