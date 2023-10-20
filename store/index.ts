import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { navbarPortalReducer, headerBurgerMenuReducer, initializeAuthReducer } from './slices';
import { NavbarPortalState, HeaderBurgerMenuState, InitializeAuthState } from "@/app/interfaces/redux";

const store = configureStore({
  reducer: {
    navbarPortal: navbarPortalReducer,
    headerBurgerMenu: headerBurgerMenuReducer,
    initializeAuth: initializeAuthReducer,
  },
});

export interface RootState {
  navbarPortal: NavbarPortalState,
  headerBurgerMenu: HeaderBurgerMenuState,
  initializeAuth: InitializeAuthState,
};

export type AppDispatch = typeof store.dispatch;

export default store;
