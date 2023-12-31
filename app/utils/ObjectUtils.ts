import Product, { ProductSchema, CartProduct } from "../interfaces/Product";

/* Typically some object related methods typical to JS go here, e.g. 
deep equal comparison, range, split array to chunks etc. */
abstract class ObjectUtils {
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

  static swapUrlsInProducts(products: Product[]): void {
    const imageIndexes: { [key: number]: number } = { 0:1, 1:5, 2:9, 3:4, 4:3, 5:0, 6:7, 7:6, 8:2, 9:8 };
    const originalUrls = products.map((product) => product.image_url);
    products.forEach((product, index: number) => product.image_url = originalUrls[imageIndexes[index]] )
  }

  static buildCartProductFromSchema(product: ProductSchema): CartProduct {
    return {
      currency: product.offers.priceCurrency,
      description: product.description,
      image: product.image,
      name: product.name,
      sku: product.sku
    }
  }
}

export default ObjectUtils;
