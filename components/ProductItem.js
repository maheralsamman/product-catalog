import Link from "next/link";
//import articleStyles from '../styles/Article.module.css'
import Image from "next/image";

const ProductItem = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <a className="">
        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <Image src={product.image} width={200} height={200}></Image>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.rating.rate}</p>
        <hr />
      </a>
    </Link>
  );
};

export default ProductItem;
