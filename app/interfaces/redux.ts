import { AxiosError } from "axios";

export interface NavbarPortalState {
  isNavbarPortalOpen: boolean;
}

export interface ExpandableState {
  expandedIndex: number;
}

export interface HeaderBurgerMenuState {
  isHeaderBurgerMenuOpen: boolean;
}

export interface InitializeAuthState {
  authToken: string | null;
  error: string | null;
}
