import fs from 'fs';
import shop from '../../../data/shop.json';

export default function deleteProducts(req, res) {
  const { body: { productId } } = req

  const category = shop.categories.find((category) => {
    return category.products.some((product) => {
      return product.id === productId
    })
  })
  category.products = category.products.filter((product) => product.id !== productId);

  fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

  res.status(200).json({})
}
