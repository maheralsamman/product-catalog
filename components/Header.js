import React from "react";
import styles from "../styles/Header.module.css";
const Header = ({ loggedUser, logOut }) => {
  return (
    <section className={styles.container}>
      <div>
        {loggedUser && (
          <p className={styles.welcome}>Welcome {loggedUser.displayName}</p>
        )}
      </div>
      {loggedUser && (
        <button className={styles.logout} onClick={logOut}>
          Sign out
        </button>
      )}
    </section>
  );
};

export default Header;
