import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import Image from "next/image";
import styles from "../../../styles/ProductId.module.css";

const product = ({ product }) => {
  // const router = useRouter()
  // const { id } = router.query

  return (
    <div>
      {product && (
        <div className={styles.container}>
          <Meta title={product.title} description={product.description} />
          <h1>{product.title}</h1>
          <Image className={styles.image} src={product.image} width={400} height={400}></Image>
          <p>{product.description}</p>
          <br />
          <Link href="/"><p className={styles.goBack}>Go Back</p></Link>
        </div>
      )}
    </div>
  );
};

export const getStaticProps = async (context) => {
  const server = "https://fakestoreapi.com/products/";
  const res = await fetch(`${server}${context.params.id}`);

  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths = async () => {
  const server = "https://fakestoreapi.com/products/";

  const res = await fetch(`${server}`);

  const products = await res.json();

  const ids = products.map((product) => product.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
export default product;
