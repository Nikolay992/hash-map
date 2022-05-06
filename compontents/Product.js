import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/Shop.module.css';

import { requestProduct, orderProduct, deleteProducts, updateProductQty } from '../utils/product';

export default function Product({ product, admin }) {
  const router = useRouter();
  const { productName, qty, id } = product;
  const [productQty, setProductQty] = useState(qty);

  const addToCart = async () => {
    const order = await orderProduct(id);
    setProductQty(order.newQty || 0)
  }

  const updateQuantity = async () => {
    const newQty = prompt('Insert new quantity');
    const res = await updateProductQty(id, newQty);
    setProductQty(res.newQty || 0)
  }

  return (
    <li className={`${styles.product} ${admin ? styles.admin : ''}`}>
      <div className={styles.productInfo}>
        <h4 dangerouslySetInnerHTML={{ __html: productName }} />
        {
          product["note"] && (
            <span>{product["note"]}</span>
          )
        }
      </div>
      {
        admin ? (
          <div className={`${styles.product} ${styles.adminButtons}`}>
            <button className={styles.editButton} onClick={() => alert('Actually WIP')}>Edit &#x270F;</button>
            {admin && <span className={styles.availablility}>Availability: {productQty}</span>}
            <button className={styles.updateButton} onClick={() => updateQuantity(id)}>Update quantity &#x1F504;</button>
            <button className={styles.deleteButton}
              onClick={async () => {
                await deleteProducts(id)
                  .then(() => router.reload());
              }}
            >Delete &#x1F5D1;</button>
          </div>
        ) :
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

    </li >
  )
}