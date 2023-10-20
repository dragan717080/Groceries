'use client';
import Image from 'next/image';
import { Header, Products, Footer } from './(site)/components';
import { Provider } from 'react-redux';

import store from '../store';

export default function Home() {
  return (
    <>
      <div>
        <section className="col-h justify-between min-w-[100%]">
          <div className='relative'>
            <div id="navbar-portal-root" className='mt-[-6px]'></div>
            <div id="__next"></div>
          </div>
        </section>
      </div>
      <main className='bg-light'>
        <div className="top-12 left-0">
          <Products />
        </div>
      </main>
    </>
  )
}
