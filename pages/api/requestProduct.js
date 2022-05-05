import fs from 'fs';
import shop from '../../data/shop.json';

export default function requestProductById(req, res) {
  const { body: { productId } } = req

  let productRequested = {};
  shop.categories.find((category) => {
    return category.products.some((product) => {
      if (product.id === productId) productRequested = product
      return product.id === productId
    })
  });

  productRequested.productRequests = productRequested.productRequests ? productRequested.productRequests += 1 : 1;

  Object.assign(productRequested)
  fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

  res.status(200).json(
    {
      newRequest: productRequested.productRequests,
    }
  )
}
