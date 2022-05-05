import React, { useState } from 'react';

import styles from '../styles/Shop.module.css';

import { requestProduct, orderProduct, deleteProducts } from '../utils/product';

export default function Product({ product }) {
  const { productName, qty, id } = product;
  const [productQty, setProductQty] = useState(qty);

  const addToCart = async () => {
    const order = await orderProduct(id);
    setProductQty(order.newQty || 0)
  }

  return (
    <li className={styles.product}>
      <div className={styles.productInfo}>
        <h4 dangerouslySetInnerHTML={{ __html: productName }} />
        {
          product["note"] && (
            <span>{product["note"]}</span>
          )
        }
      </div>
      {
        productQty !== 0 ? (
          <div className={styles.productInteractions}>
            <span>Availability: {productQty}</span>
            <button onClick={async () => addToCart(id)}>Add to cart  &#x1F6D2;</button>
          </div>
        ) : (
          <div className={styles.productInteractions}>
            <span>Availability: Sorry, product is not available at this moment</span>
            <button onClick={() => requestProduct(id)}>Request it!</button>
          </div>
        )
      }
      {/* <button onClick={() => deleteProducts(id)}>Delete</button> */}
    </li>
  )
}