interface Product {
  app_id: number;
  barcode: null | string;
  body: string;
  code: null | string;
  color: null | string;
  external_ref: null | string;
  id: number;
  image_url: string;
  inserted_at: string;
  measuring_unit_id: number;
  prices: ProductPrice[];
  product_id: number;
  product_type_id: null | string;
  title: string;
  updated_at: string;
  updated_by_user_id: null | string;
  vat_id: null | string;
}

interface ProductPrice {
  bp: number;
  catalog_id: number;
  catalog_item_id: number;
  currency_id: number;
  default_price: number;
  line_type: string;
  member_price: number;
  mu_price: number;
  net_price: number;
  ordable: boolean;
  price: number;
  product_id: number;
}

export default Product;

export interface ProductSchema {
  '@context': 'http://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  sku: string;
  mpn?: string;
  brand?: string;
  image: string;
  offers: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: 'http://schema.org/InStock' | 'http://schema.org/OutOfStock';
    itemCondition?: 'http://schema.org/NewCondition' | 'http://schema.org/UsedCondition' | 'http://schema.org/RefurbishedCondition' | 'http://schema.org/DamagedCondition';
  };
}
