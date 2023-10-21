import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import store, { RootState } from '@/store';
import { getProducts } from '@/app/config/initApp';
import { useSession } from 'next-auth/react';
import Product, { ProductSchema } from '@/app/interfaces/Product';
import ObjectUtils from '@/app/utils/ObjectUtils';
import Image from 'next/image';

const Products: FC = () => {

  const authToken = useSelector((state: RootState) => state.initializeAuth.authToken);
  const session = useSession();

  const [products, setProducts] = useState<ProductSchema[]>([]);

  useEffect(() => {
    if (authToken) {
      getProducts(authToken)
        .then((products) => {
          setProducts(products.map((product: Product) => ObjectUtils.createProductSchema(product)));
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [authToken]);

  return (
    <section>
      <div className="px-4 md:px-10 xl:px-[15rem] 2xl:px-[22rem] py-24 col-h gap-10">
        {products.map((product, index: number) => (
          <div className='flex space-x-10' key={index} >
            <div className="relative h-[18rem] w-[20rem] md:w-[24rem] lg:w-[26rem] xl:w-[28rem]">
              <Image layout='fill' alt={`${product.name} Image`} src={product.image} className='rounded-lg' />
            </div>
            <div className='flex-col mt-8 hidden md:flex'>
              <div className="bold mb-3 text-lg">{product.name}</div>
              <div className="t-gray t-wrap max-w-[40rem] ">{product.description}</div>
              <button className={
                `text-white px-7 py-2 text-sm shadow-md rounded-full my-3 hover:shadow-xl max-w-fit active:scale-90 mt-auto transition duration-150 ${session.status !== 'authenticated' ? 'bg-black' : 'bg-red-500'}`}>
                { session.status !== 'authenticated' ? product.offers.price : product.offers.member_price }
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products;
