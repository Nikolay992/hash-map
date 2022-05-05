import shop from '../../data/shop.json';

export default function shopProductsByCategory(req, res) {
  const { query: { category: categoryId } } = req
  let categoryProducts = [];

  categoryProducts = shop.categories.find((category) => category.categoryId === categoryId);

  res.status(200).json(
    {
      ...categoryProducts
    }
  )
}
