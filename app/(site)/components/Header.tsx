'use client';
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Navbar } from '.';
import ArrowIcon from '@/public/assets/svgs/ArrowIcon';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { HeaderMenuToolbar } from './navbar-toolbars';
import { setIsHeaderBurgerMenuOpen } from '@/store/slices/headerBurgerMenuSlice';
import { initApp } from '@/app/config/initApp';
import StringUtils from '@/app/utils/StringUtils';
import { setAuthToken, setError } from '@/store/slices/initializeAuthSlice';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type ToDisplayProps = {
  toDisplay: boolean;
};

const Header: FC<ToDisplayProps> = ({ toDisplay }) => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const display = toDisplay || session?.status === 'authenticated';

  const isHeaderBurgerMenuOpen = useSelector((state: RootState) => state.headerBurgerMenu.isHeaderBurgerMenuOpen);

  const uuid = StringUtils.generateUUIDv4();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await initApp(uuid, 'Windows');
        dispatch(setAuthToken(token));
      } catch (error) {
        dispatch(setError((error as AxiosError).message));
      }
    }

    fetchData();
  }, [session?.status]);

  return !display
    ? <></>
    : (
      <header className='sticky top-0 z-40 row-v bg-gray-600 shadow-md py-3 px-4 md:px-10 xl:px-[15rem] 2xl:px-[22rem]'>
        <Navbar />
        <div className='row-v min-w-[40%] md:min-w-[14rem] xl:min-w-[17rem] 2xl:min-w-[20rem] xs:py-1 pt-2.5 pb-2 xs:border-2 rounded-full md:shadow-sm xs:mx-6'>
          <input
            type="text"
            placeholder='Start your search'
            className='ml-1 pl-4 border-none outline-none bg-transparent flex-grow text-sm text-white placeholder-gray-300'
          />
          <MagnifyingGlassIcon className='h-8 mr-2 p-2 bg-red-400 text-white rounded-full pointer hidden xs:inline-flex xs:mx-2' />
        </div>
        <div className='flex items-center space-x-4 text-white md:ml-auto semibold'>
          {session.status === 'authenticated'
            ? <div className='inline-flex'>
              <div className='t-red text-three-dots-wrapper max-w-[14rem]'>{session.data!.user!.email}</div>
              <button className='t-cornflowerblue ml-3' onClick={async () => { toast.success('Logged out!'); await signOut(); }} >Logout</button>
            </div>
            : <div className='md:pl-3 lg:pl-0 md:pr-16 2xl:pr-4 hover:text-red-400'><a href='auth'>Login</a></div>
          }
        </div>
        <div
          id="burger-menu-btn"
          className="block md:hidden text-white text-xl ml-auto xs:mr-6 relative"
          onClick={() => dispatch(setIsHeaderBurgerMenuOpen(!isHeaderBurgerMenuOpen))}>
          <span>{!isHeaderBurgerMenuOpen ? '☰' : 'X'}</span>
          <HeaderMenuToolbar isOpen={isHeaderBurgerMenuOpen} />
        </div>
      </header>
    );
};

export default Header;
