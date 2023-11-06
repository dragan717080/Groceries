import { ProductSchema } from "./Product";

export interface AuthStore {
  authToken: string | null;
  error: string | null;
  setAuthToken: (authToken: string | null) => void;
  setError: (error: string | null) => void;
}

export interface HeaderBurgerMenuStore {
  isHeaderBurgerMenuOpen: boolean;
  toggleIsHeaderBurgerMenuOpen: () => void;
}

export interface NavbarPortalStore {
  isNavbarPortalOpen: boolean;
  setIsNavbarPortalOpen: (value: boolean) => void;
}

export interface SearchInputStore {
  searchInput: string;
  setSearchInput: (value: string) => void;
}

export interface ProductsStore {
  products: ProductSchema[];
  setProducts: (value: ProductSchema[]) => void;
}

export interface ProductsMatchingInputStore {
  productsMatchingInput: ProductSchema[];
  setProductsMatchingInput: (value: ProductSchema[]) => void
}
