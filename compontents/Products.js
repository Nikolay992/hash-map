import React from 'react';

import Product from './Product';

import styles from '../styles/Shop.module.css'

export default function Products({ products }) {
  return (
    <ul className={styles.products}>
      {
        products.map((product) => (
          <Product key={`Product_Key - ${product.id}`} product={product} />
        ))
      }
    </ul>
  )
}