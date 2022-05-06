import fs from 'fs';
import shop from '../../../data/shop.json';

export default function createProducts(req, res) {
  const { body: { productData } } = req
  const { id, name, description, qty, category: categoryId } = productData;

  const newProduct = {
    id,
    productName: name,
    note: description,
    qty
  }
  const category = shop.categories.find((category) => category.categoryId === categoryId)

  let productExisting = false;
  shop.categories.find((category) => {
    return category.products.some((product) => {
      if (product.id === id) productExisting = product
      return product.id === id
    })
  });

  if (!productExisting) {
    category.products.push(newProduct);

    fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

    res.status(200).json({})
  } else
    res.status(200).json({
      error: 'Product with this ID already exists'
    })
}
