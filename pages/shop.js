import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

import Products from '../compontents/Products';
import NewProductModal from '../compontents/NewProductModal';

import styles from '../styles/Home.module.css'

export default function Shop({ data }) {
  const router = useRouter();
  const { query } = router;

  const [createProduct, setCreateProduct] = useState(false);

  const { categoryInfo = {}, products, categoryId = query.category } = data;

  const logoutUser = () => {
    router.push('/')
  }

  useEffect(() => {
    if (createProduct) {
      window.scrollTo(0, 0)
      window.document.body.style.overflow = 'hidden'
    }
    else
      window.document.body.style.overflow = ''
  }, [createProduct])

  return (
    <div className={`${styles.container} ${createProduct ? styles.modalOpen : ''}`}>
      <Head>
        <title>{`Shop - ${categoryInfo.name}`}</title>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to <Link href="/">Jumbo Store</Link>
          <br />
          {categoryInfo.name}
        </h3>

        <p className={styles.description} dangerouslySetInnerHTML={{ __html: categoryInfo.description || '' }} />

        <div className={styles.shopHeader}>
          <button onClick={() => setCreateProduct(true)} className={styles.createProduct}>Add new product</button>
          <p className={styles.userInOut}>
            <u><a onClick={() => logoutUser()}>Logout &#x274C;</a></u>
          </p>
        </div>

        <Products category={categoryId} products={products} />

        {categoryId === 'admin' && createProduct && <NewProductModal callBack={setCreateProduct} categories={products} />}
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { category } = query;
  const data = await fetch(`http://localhost:3000/api/shop?category=${category}`)
    .catch(error => console.log('error', error))
  if (category !== 'admin')
    await fetch(`http://localhost:3000/api/tracking/trackCategory?category=${category}`)
      .catch(error => console.log('error', error))

  return {
    props: {
      data: await data.json()
    }
  };
}