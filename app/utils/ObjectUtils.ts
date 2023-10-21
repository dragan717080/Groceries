import Product, { ProductSchema } from "../interfaces/Product";

abstract class ObjectUtils {
  static splitArrayToChunks = (arr: unknown[], size: number): unknown =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i*size, i*size + size));

  static createProductSchema(product: Product): ProductSchema {
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
        availability: `http://schema.org/InStock`,
      },
    };

    productSchema.offers.itemCondition = "http://schema.org/NewCondition";
  
    return productSchema;
  }
}

export default ObjectUtils;
