import { FC, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { useSearchInputStore } from '@/store/zustandStore';
import { v4 as uuidv4 } from 'uuid';
import { useProductsMatchingInputStore } from '@/store/zustandStore';
import { ProductSchema } from '@/app/interfaces/Product';
import { useShoppingCart } from "use-shopping-cart";
import { useSession } from "next-auth/react";
import ObjectUtils from '@/app/utils/ObjectUtils';

const HeaderSearchMenu: FC = () => {

  const session = useSession();

  const { setSearchInput } = useSearchInputStore();

  const { productsMatchingInput, setProductsMatchingInput } = useProductsMatchingInputStore();

  const { addItem, handleCartClick } = useShoppingCart();

  const getCurrentPrice = (product: ProductSchema): number =>
    session.status !== 'authenticated' ? product.offers.price : product.offers.member_price;

  const handleSelectProduct = (e: MouseEvent<HTMLElement>, product: ProductSchema) => {
    setProductsMatchingInput([]);
    setSearchInput('');
    const cartProduct = {
      ...ObjectUtils.buildCartProductFromSchema(product),
      price: getCurrentPrice(product),
      currency: 'USD'
    }

    addItem(cartProduct as any);
    handleCartClick();
  }

  return (
    <div className={`${!productsMatchingInput.length ? 'hidden' : ''} mt-4`}>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-5 mx-auto w-[fit-content]">
        {productsMatchingInput.map((product) => (
          <div
            className="mx-auto py-2 pl-2 flex flex-col md:row space-y-4 md:space-y-0 md:space-x-0 hover:bg-gray-200 hover:scale-105 active:scale-95 transition transform duration-200 ease-out pointer"
            onClick={(e) => handleSelectProduct(e, product)}
            key={uuidv4()}
          >
            <div className='relative h-16 w-24 mx-auto' >
              <Image fill alt={`${product.name} Image`} src={product.image ?? ''} className='rounded-xl' sizes='6rem' />
            </div>
            <div className='w-28 md:w-[10rem] overflow-hidden text-ellipsis text-center md:whitespace-nowrap ml-0 space-y-0'>
              {product.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeaderSearchMenu;
