import React from 'react';

import Product from './Product';

import styles from '../styles/Shop.module.css'

export default function Products({ products, category }) {
  return category === 'admin' ?
    Object.values(products).map((categoryProducts) => {
      const { categoryInfo, categoryId, products } = categoryProducts;
      return (
        <div key={`Category-${categoryId}`}>
          <h3>{categoryInfo.name}</h3>
          <ul className={styles.products}>
            {
              products.length > 0 && products.map((product) => (
                <Product admin key={`Product_Key - ${product.id}`} product={product} />
              ))
            }
          </ul>
        </div>
      )
    })
    : (
      <ul className={styles.products}>
        {
          products.length > 0 && products.map((product) => (
            <Product key={`Product_Key - ${product.id}`} product={product} />
          ))
        }
      </ul>
    )
}