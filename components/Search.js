import styles from "../styles/Search.module.css";

const Search = ({ searchTerm, setSearchTerm, searchHandler }) => {
  return (
    <section className={styles.container}>
    <input
    className={styles.input}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      type="text"
      placeholder="Search word"
    />
    <button className={styles.searchBtn} onClick={searchHandler}>Search</button>
  </section>
  )
}

export default Search