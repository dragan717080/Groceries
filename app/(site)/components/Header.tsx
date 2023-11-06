'use client';

import { FC, ChangeEvent, MouseEvent, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Navbar } from '.';
import ArrowIcon from '@/public/assets/svgs/ArrowIcon';
import Link from 'next/link';
import { HeaderMenuToolbar } from './navbar-toolbars';
import { initApp } from '@/app/config/initApp';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useHeaderBurgerMenuStore, useAuthStore, useSearchInputStore,
  useProductsStore, useProductsMatchingInputStore } from '@/store/zustandStore';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingCart } from 'lucide-react';
import { useShoppingCart } from 'use-shopping-cart';
import HeaderSearchMenu from './HeaderSearchMenu';
import { ProductSchema } from '@/app/interfaces/Product';

const Header: FC = () => {
  const session = useSession();
  const router = useRouter();

  const uuid = uuidv4();

  const { authToken, error, setAuthToken, setError } = useAuthStore();

  const { isHeaderBurgerMenuOpen, toggleIsHeaderBurgerMenuOpen } = useHeaderBurgerMenuStore();

  const { searchInput, setSearchInput } = useSearchInputStore();

  const { products, setProducts } = useProductsStore();

  const { productsMatchingInput, setProductsMatchingInput } = useProductsMatchingInputStore();

  const { handleCartClick } = useShoppingCart();

  const searchRef = useRef<HTMLInputElement | null>(null);

  const onLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push((e.target as HTMLAnchorElement).href.replace('product/', ''))
  }

  const setProductsThatMatch = (products: ProductSchema[]) => {
    const inputLimit: number = 10;

    const input = searchRef.current!.value;

    if (!input) {
      setProductsMatchingInput([]);
      return;
    }

    const productsThatMatch = products.reduce((result, product) => {
      if (result.length >= inputLimit) {
        return result;
      }

      if (product.name.toLowerCase().includes(input!.toLowerCase())) {
        result.push(product);
      }

      return result;
    }, [] as ProductSchema[]);

    setProductsMatchingInput(productsThatMatch);
    console.log(productsThatMatch);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductsThatMatch(products);
    setSearchInput(searchRef.current!.value);
  };

  useEffect(() => {
    if (authToken) {
      return;
    }

    async function fetchData() {
      try {
        // Pokusao sam preko User Agent ali nekad daje pogresan OS tako da bolje da hardkodujem
        const token = await initApp(uuid, 'Windows');
        setAuthToken(token);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    }

    fetchData();
  }, [session?.status]);

  return (
    <header className='sticky top-0 z-40 bg-white shadow-lg py-3 text-gray-600'>
      <div className="row">
        <div
          onClick={() => router.push('/')}
          className="row"
        >
          <div className='relative row-v h-10 w-10 pointer hidden md:block'>
            <Image
              fill
              src='/assets/images/logo.webp'
              objectFit='contain'
              objectPosition='left'
              alt={`logo`}
            />
          </div>
          <Link href="/">
            <h1 className="text-xl md:text-2xl bold -mt-1.5 ml-2.5 pt-0.5 hidden md:block">
              Dragan<span className="t-primary hidden md:contents">Websites</span>
            </h1>
          </Link>
        </div>
        <Navbar />
        <div className='row-v min-w-[40%] md:min-w-[14rem] xl:min-w-[17rem] 2xl:min-w-[20rem] xs:py-1 pt-2.5 pb-2 xs:border-2 rounded-full md:shadow-sm xs:mx-6'>
          <input
            type="text"
            placeholder='Start your search'
            className='ml-1 pl-4 border-none outline-none bg-transparent flex-grow text-sm placeholder-gray-300'
            onChange={handleInputChange}
            ref={searchRef}
            value={searchInput}
          />
          <MagnifyingGlassIcon className='h-8 mr-2 p-2 bg-primary text-white rounded-full pointer hidden xs:inline-flex xs:mx-2' />
        </div>
        <ShoppingCart className='pointer' onClick={() => handleCartClick()} />
        <div className='row-v space-x-4 text-gray-600 semibold ml-10 sm:ml-0'>
          {session.status === 'authenticated'
            ? <div className='inline-flex'>
              <UserCircleIcon className='w-4 ml-5 mr-2 hidden md:block' />
              <div className='t-red md:pr-1 max-w-[9rem] text-ellipsis overflow-hidden hidden md:block'>{session.data!.user!.email}</div>
              <button className='t-cornflowerblue ml-3' onClick={async () => await signOut()} >Logout</button>
            </div>
            : <div className='md:pl-3 lg:pl-6 2xl:pr-4 hover:text-primary pr-2 md:pr-16'>
              <Link href='auth' onClick={(e) => onLinkClick(e)}>
                Login
              </Link>
            </div>
          }
        </div>
        <div
          id="burger-menu-btn"
          className="block md:hidden text-gray-600 text-xl ml-auto mr-4 xs:mr-6 relative"
          onClick={toggleIsHeaderBurgerMenuOpen}
        >
          <span>{!isHeaderBurgerMenuOpen ? '☰' : 'X'}</span>
          <HeaderMenuToolbar isOpen={isHeaderBurgerMenuOpen} />
        </div>
      </div>
      {searchInput && (
        <HeaderSearchMenu />
      )}
    </header>
  );
};

export default Header;
