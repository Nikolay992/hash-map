import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';

import { checkUserLogin } from '../utils';

import styles from '../styles/Home.module.css'

export default function Home({ data }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginUser = () => {
    const username = prompt("Insert your username");
    const password = prompt("Insert your password");
    setUser(checkUserLogin({ username, password }) || false);
  }

  useEffect(() => {
    if (user) {
      console.log('user', user);
      router.push({ pathname: '/shop', query: { category: user.category } })
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Shop - HashMap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to <Link href="/">Jumbo Store</Link>
        </h3>

        <p className={styles.userInOut}>
          Login <u><a onClick={() => loginUser()}>Here</a></u>
          <br />
          {user === false && (<span className={styles.errorText}>An error has been occured, check your data and retry!</span>)}
        </p>

      </main>
    </div>
  )
}
