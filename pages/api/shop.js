import shop from '../../data/shop.json';

export default function shopProductsByCategory(req, res) {
  const { query: { category: categoryId } } = req
  let categoryProducts = [];

  categoryProducts = categoryId !== 'admin' ?
    shop.categories.find((category) => category.categoryId === categoryId)
    : shop.categories.map((category) => category);

  if (categoryId !== 'admin')
    res.status(200).json(
      {
        ...categoryProducts
      }
    )
  else
    res.status(200).json(
      {
        "categoryId": "admin",
        "categoryInfo": {
          "name": "Admin Panel",
          "description": "Update, remove and delete products"
        },
        products: [...categoryProducts],
      }
    )
}
