import React from "react";
import styles from "../Header/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.header_logo}>
        <img
          src="/images/Bubble.png"
          alt=""
          style={{ maxHeight: "40px", marginRight: "20px" }}
        />
        <p>Bubble Cards</p>
      </a>
      <ul className={styles.header_navbar}>
        <li className={styles.header_navbar_li}>
          <a href="#">Home</a>
        </li>
        <li className={styles.header_navbar_li}>
          <a href="#">About</a>
        </li>
        <li className={styles.header_navbar_li}>
          <a href="#">Let's go</a>
        </li>
        <li className={styles.header_navbar_li}>
          <a href="#">Contact</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
