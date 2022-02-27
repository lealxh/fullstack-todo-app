import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fullstack Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className>Fullstack Todo App</h1>

        <Link href="/todos/">
          <a>List todos</a>
        </Link>
        <br />
        <Link href="/todos/create">
          <a>Create todo</a>
        </Link>
      </main>
    </div>
  )
}
