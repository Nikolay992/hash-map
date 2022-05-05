import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

import Products from '../compontents/Products';

import styles from '../styles/Home.module.css'

export default function Shop({ data }) {
  const router = useRouter();
  const { categoryInfo = {}, products = {} } = data;

  const logoutUser = () => {
    router.push('/')
  }

  return (
    <div className={styles.container}>
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
        <p className={styles.userInOut}>
          Logout <u><a onClick={() => logoutUser()}>Here</a></u>
        </p>
        <Products products={products} />
      </main>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const { category } = query;
  const data = await fetch(`http://localhost:3000/api/shop?category=${category}`)
    .catch(error => console.log('error', error))
  await fetch(`http://localhost:3000/api/tracking/trackCategory?category=${category}`)
    .catch(error => console.log('error', error))

  return {
    props: {
      data: await data.json()
    }
  };
}