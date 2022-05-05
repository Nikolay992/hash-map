import fs from 'fs';
import shop from '../../data/shop.json';

export default function orderedProductById(req, res) {
  const { body: { productId } } = req

  let productOrdered = {};
  shop.categories.find((category) => {
    return category.products.some((product) => {
      if (product.id === productId) productOrdered = product
      return product.id === productId
    })
  });

  productOrdered.qty = productOrdered.qty > 0 ? productOrdered.qty -= 1 : 0;

  Object.assign(productOrdered)
  fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

  res.status(200).json(
    {
      newQty: productOrdered.qty,
    }
  )
}
