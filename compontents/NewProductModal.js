import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/Modal.module.css'

import { createProduct } from '../utils/product';

export default function NewProductModal({ categories = [], callBack }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [name, setName] = useState(null);
  const [id, setProductId] = useState(null);
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState(0);

  const addNewProduct = async () => {
    if (selectedCategory && name && id && Number.isInteger(parseInt(qty)) && qty >= 0) {
      const productData = {
        id,
        category: selectedCategory,
        name,
        description,
        qty
      }

      await createProduct(productData).then((res) => {
        if (res.error)
          alert(`Error: ${res.error}`)
        else {
          callBack();
          router.reload();
        }
      })

    } else {
      alert('Please check the values and try again.');
    }
  }

  return (
    <div className={styles.modalContainer}>
      <div onClick={() => callBack()} className={styles.close}><span>Close &#x274C;</span></div>
      <div>
        <span><b>Choose category<i>*</i>:</b></span>
      </div >
      <div className={styles.radioContainer} onChange={(event) => setSelectedCategory(event.target.value)}>
        {
          categories.map((category) => {
            const { categoryInfo, categoryId } = category;
            return (
              <div>
                - {categoryInfo.name} <input type="radio" value={categoryId} name="gender" />
              </div>
            )
          })
        }
      </div>
      <div className={styles.modalInputText}>
        <div>
          <b>Product ID<i>*</i></b>: <input onChange={(event) => setProductId(event.target.value)} type="text" placeholder='Insert product id here..' />
        </div>

        <div>
          <b>Product name<i>*</i></b>: <input onChange={(event) => setName(event.target.value)} type="text" placeholder='Insert product name here..' />
        </div>
        <div>
          <b>Product availability</b>: <input onChange={(event) => setQty(event.target.value)} type="text" placeholder='Insert product availability here..' />
        </div>
        <div>
          <b>Product description</b>: <input onChange={(event) => setDescription(event.target.value)} type="text" placeholder='Insert product description here..' />
        </div>
      </div>

      <small><span><i>Produts marked with * are mandatory and Availability must be a number</i></span></small>

      <button className={styles.button} onClick={() => addNewProduct()}>Submit</button>
    </div >
  )
}