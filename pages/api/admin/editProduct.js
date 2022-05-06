import fs from 'fs';
import shop from '../../../data/shop.json';

export default function editProductById(req, res) {
  const { body: { productId, productName, note } } = req

  let productToEdit = {};
  shop.categories.find((category) => {
    return category.products.some((product) => {
      if (product.id === productId) productToEdit = product
      return product.id === productId
    })
  });
  productToEdit.productName = productName || productToEdit.productName;
  productToEdit.noote = note || productToEdit.note;

  Object.assign(productToEdit)
  fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

  res.status(200).json(
    {
      product: productToEdit,
    }
  )
}
