import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, provider } from "../firebase";
import Header from "../components/Header";
import Categories from "../components/Categories";
import NewProduct from "../components/NewProduct";

export default function Home({ products }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const [myProducts, setMyProducts] = useState(products);
  const [title, setTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const cats = products.map((p) => p.category);
  const categories = [...new Set(cats)];
  const router = useRouter();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user);
        console.log(user.displayName, "is logged in");
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        console.log("not logged in");
        router.push("/login");
        // User is signed out
        // ...
      }
    });
    /*       if (user) {
        setNewUser(user)
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        //router.push('/login');
        // User is signed out
        // ...
      } */
  }, []);

  const filterCat = (ele) => {
    const filteredProducts = products.filter(
      (product) => product.category === ele
    );
    setMyProducts(filteredProducts);
  };

  const addProduct = () => {
    const rate = { rate: 4.2 };
    const newProduct = {
      title,
      description,
      category,
      image: "https://picsum.photos/seed/picsum/200/300",
      rating: rate,
      id: products.length + 1,
    };
    const newProducts = [...myProducts, newProduct];
    setMyProducts(newProducts);
    setCategory("");
    setDescription("");
    setTitle("");
  };
  const deleteProduct = () => {};
  const searchProduct = () => {};
  const searchHandler = () => {
    if (!searchTerm) {
      return;
    }
    let productsArr = [];
    products.map((product) => {
      if (
        product.title.includes(searchTerm) ||
        product.category.includes(searchTerm) ||
        product.description.includes(searchTerm)
      ) {
        productsArr.push(product);
      }
    });
    if (productsArr.length > 0) setMyProducts(productsArr);
    else alert("no products found");
  };
  return (
    loggedUser && (
      <div className={styles.container}>
        <Head>
          <title>Products catalog</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header loggedUser={loggedUser} logOut={logOut} />
        <Categories
          filterCat={filterCat}
          products={products}
          categories={categories}
          myProducts={myProducts}
          setMyProducts={setMyProducts}
        />
        <NewProduct
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          setCategory={setCategory}
          category={category}
          addProduct={addProduct}
        />
        <section>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search word"
          />
          <button onClick={searchHandler}>Search</button>
        </section>
        <main>
          <ProductList products={myProducts} />
        </main>
        {/* 
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
 */}{" "}
      </div>
    )
  );
}
export const getStaticProps = async () => {
  const server = "https://fakestoreapi.com/products/";
  const res = await fetch(`${server}`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};
