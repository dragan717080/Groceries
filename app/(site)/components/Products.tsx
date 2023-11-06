import { FC, useState, useEffect } from 'react';
import { getProducts } from '@/app/config/initApp';
import { useSession } from 'next-auth/react';
import Product, { ProductSchema } from '@/app/interfaces/Product';
import ObjectUtils from '@/app/utils/ObjectUtils';
import Image from 'next/image';
import { useAuthStore } from '@/store/zustandStore';
import { AddToBag } from '.';
import { v4 as uuidv4 } from 'uuid';

const Products: FC = () => {

  const session = useSession();

  const [products, setProducts] = useState<ProductSchema[]>([]);

  const { authToken } = useAuthStore();

  const getCurrentPrice: number = (product: ProductSchema) =>
    session.status !== 'authenticated' ? product.offers.price : product.offers.member_price;

  useEffect(() => {
    if (authToken) {
      getProducts(authToken)
        .then((products) => {
          ObjectUtils.swapUrlsInProducts(products);
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
          <div className='flex flex-col md:flex-row md:space-x-10 space-y-4' key={index} >
            <div className="relative h-[18rem] w-[20rem] md:w-[24rem] lg:w-[26rem] xl:w-[28rem]">
              <Image layout='fill' alt={`${product.name} Image`} src={product.image} className='rounded-lg' />
            </div>
            {/* Large screens */}
            <div className='flex-col mt-8 hidden md:flex'>
              <div className="bold mb-3 text-lg">{product.name}</div>
              <div className="t-gray t-wrap max-w-[40rem] ">{product.description}</div>
              <div className="flex mt-auto">
                <AddToBag
                  currency={product.offers.priceCurrency}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={getCurrentPrice(product)}
                  price_id={uuidv4()}
                  key={uuidv4()}
                  sku={product.sku}
                  isLargeScreen={true}
                />
                {session.status === 'authenticated' && (
                  <div className='text-red-400 line-through ml-4 pt-2.5'>RSD {product.offers.price}</div>
                )}
              </div>
            </div>
            {/* Small screens */}
            <div className="flex md:hidden m-0 w-full">
              <AddToBag
                currency={product.offers.priceCurrency}
                description={product.description}
                image={product.image}
                name={product.name}
                price={getCurrentPrice(product)}
                price_id={uuidv4()}
                key={uuidv4()}
                sku={product.sku}
                isLargeScreen={false}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products;
