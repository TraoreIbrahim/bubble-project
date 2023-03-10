import React from "react";
import styles from "../Banner/Banner.module.css";
import FloatingButton from "../../components/floatingButton/FloatingButton";

const Banner = () => {
  return (
    <>
      <main className={styles.banner}>
        <div className={styles.banner_textBox}>
          <h2 className={styles.banner_text}>
            Les cartes
            <br />
            <span className={styles.banner_span}>Bubble Cards</span>
            <br /> vont vous éclater !
          </h2>
          <p className={styles.banner_text_p}>
            Vous avez envie de créer une belle carte virtuelle pour une occasion
            particulière ou pour le plaisir ?
            <br />
            Vous êtes au bon endroit !
          </p>
        </div>
        <div className={styles.banner_imgBox}>
          <img
            className={styles.banner_img}
            src="/images/girlBubble.png"
            alt="girl gum"
          />
        </div>
      </main>
      <FloatingButton />
    </>
  );
};

export default Banner;
