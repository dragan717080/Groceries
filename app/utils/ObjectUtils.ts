abstract class ObjectUtils {
  static splitArrayToChunks = (arr: unknown, size: integer): unknown =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i*size, i*size + size));

  static createProductSchema(product: {
    name: string;
    body: string;
    sku: string;
    mpn?: string;
    brand?: string;
    image: string;
    price: number;
    priceCurrency: string;
    availability: 'InStock' | 'OutOfStock';
    itemCondition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition' | 'DamagedCondition';
  }): ProductSchema {
    const productSchema: ProductSchema = {
      '@context': 'http://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.body,
      sku: `SKU${product.id}`,
      image: product.image_url,
      offers: {
        '@type': 'Offer',
        price: product.prices[0].price,
        member_price: product.prices[0].member_price,
        priceCurrency: 'RSD',
        availability: `In Stock`,
      },
    };
  
    if (product.mpn) {
      productSchema.mpn = product.mpn;
    }
  
    if (product.brand) {
      productSchema.brand = product.brand;
    }
  
    if (product.itemCondition) {
      productSchema.offers.itemCondition = `http://schema.org/${product.itemCondition}`;
    }
  
    return productSchema;
  }
}

export default ObjectUtils;
