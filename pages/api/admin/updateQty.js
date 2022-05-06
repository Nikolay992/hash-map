import fs from 'fs';
import shop from '../../../data/shop.json';

export default function updateProductQtyById(req, res) {
  const { body: { productId, newQty } } = req

  let productOrdered = {};
  shop.categories.find((category) => {
    return category.products.some((product) => {
      if (product.id === productId) productOrdered = product
      return product.id === productId
    })
  });
  productOrdered.qty = newQty || productOrdered.qty;

  Object.assign(productOrdered)
  fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

  res.status(200).json(
    {
      newQty: productOrdered.qty,
    }
  )
}
