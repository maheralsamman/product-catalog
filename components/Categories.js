import styles from "../styles/Categories.module.css";

const Categories = ({
  filterCat,
  categories,
  products,
  myProducts,
  setMyProducts,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesBtns}>
        {categories.map((ele, i) => (
          <button
            className={styles.categoryBtn}
            key={i}
            onClick={() => filterCat(ele)}
          >
            <p>{ele}</p>
          </button>
        ))}
        <button
          className={styles.categoryBtn}
          onClick={() => setMyProducts(products)}
        >
          All categories
        </button>
      </div>
      <p className={styles.total}>Total products: {myProducts.length}</p>
    </div>
  );
};

export default Categories;
