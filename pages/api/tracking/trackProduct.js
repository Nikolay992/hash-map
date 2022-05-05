import fs from 'fs';
import shop from '../../../data/shop.json';

export default function trackProduct(req, res) {
  const { query: { productId } } = req

  let productInteracted = {};
  shop.categories.find((category) => {
    return category.products.some((product) => {
      if (product.id === productId) productInteracted = product
      return product.id === productId
    })
  });

  productInteracted.productInteractions = productInteracted.productInteractions ? productInteracted.productInteractions += 1 : 1;

  Object.assign(productInteracted)
  fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

  res.status(200).json({})
}
