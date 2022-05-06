import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/Shop.module.css';

import { requestProduct, orderProduct, deleteProducts, updateProductQty, editProduct } from '../utils/product';

export default function Product({ product, admin }) {
  const router = useRouter();
  const { productName, qty, id, note = null } = product;
  const [productQty, setProductQty] = useState(qty);
  const [productNameS, setProductNameS] = useState(productName);
  const [description, setProductDescription] = useState(note);

  const addToCart = async () => {
    const order = await orderProduct(id);
    setProductQty(order.newQty || 0)
  }

  const updateQuantity = async () => {
    const newQty = prompt('Insert new quantity');
    const res = await updateProductQty(id, newQty);
    setProductQty(res.newQty || 0)
  }

  const handleEdit = async () => {
    const productName = prompt('Insert new name');
    const note = prompt('Insert new description');
    if (productName !== '') {
      const res = await editProduct(id, { productName, note });
      setProductDescription(res.product.note || null)
      setProductNameS(res.product.productName || '')
      console.log('res', res);
    } else {
      alert("It's not possible to remove name");
    }
  }

  return (
    <li className={`${styles.product} ${admin ? styles.admin : ''}`}>
      <div className={styles.productInfo}>
        <h4 dangerouslySetInnerHTML={{ __html: productNameS }} />
        {
          description && (
            <span>{description}</span>
          )
        }
      </div>
      {
        admin ? (
          <div className={`${styles.product} ${styles.adminButtons}`}>
            <button className={styles.editButton} onClick={() => handleEdit()}>Edit &#x270F;</button>
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