'use client';
import Image from 'next/image';
import { Header, Footer, Products, CartProvider, CartModal } from './(site)/components';

export default function Home() {
  return (
    <CartProvider>
      <CartModal />
      <Header />
      <section className="col-h justify-between min-w-[100%]">
        <div className='relative'>
          <div id="navbar-portal-root" className='mt-[-6px]'></div>
          <div id="__next"></div>
        </div>
      </section>
      <main className='flex-1'>
        <div className="top-12 left-0">
          <Products />
        </div>
      </main>
      <Footer />
    </CartProvider>
  )
}
