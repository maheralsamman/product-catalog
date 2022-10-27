import ProductItem from './ProductItem'
//import articleStyles from '../styles/Article.module.css'

const ProductList = ({ products }) => {
  return (
    <div className="">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
