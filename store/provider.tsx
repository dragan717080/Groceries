"use client";
import { Provider } from "react-redux";
import store from "./index";
import { ReactNode } from 'react';
import { Header, Footer } from "@/app/(site)/components";
import AuthContext from '../app/context/AuthContext';

// This file is needed so that layout file doesn't directly have to use 'use client'
const toDisplay = window.location.pathname !== '/auth';
export default function Providers({ children }: { children: ReactNode }) {
  return (
  <Provider store={store}>
    <AuthContext>
    <Header toDisplay={toDisplay} />
    {children}
    <Footer toDisplay={toDisplay} />
    </AuthContext>
  </Provider>
  )
}
