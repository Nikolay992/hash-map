import fs from 'fs';
import shop from '../../../data/shop.json';

export default function trackCategory(req, res) {
  const { query: { category: categoryId } } = req

  let category = shop.categories.find((category) => category.categoryId === categoryId);

  category.views = category.views ? category.views += 1 : 1;

  Object.assign(category)
  fs.writeFileSync('data/shop.json', JSON.stringify(shop, null, 2));

  res.status(200).json({})
}
