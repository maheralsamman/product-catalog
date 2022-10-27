import styles from "../styles/NewProduct.module.css";


const NewProduct = ({ title, setTitle, description, setDescription, setCategory, category , addProduct }) => {
  return (
    <section className={styles.container}>
    <input
     className={styles.input}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      type="text"
      placeholder="Title"
    />
    <input
    className={styles.input}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      type="text"
      placeholder="Description"
    />
    <input
    className={styles.input}
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      type="text"
      placeholder="Category"
    />
    <button className={styles.addBtn} onClick={addProduct}>Add Product</button>
  </section>
  )
}

export default NewProduct