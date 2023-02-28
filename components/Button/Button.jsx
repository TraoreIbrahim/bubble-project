import styles from "./Button.module.css";

const FloatingButton = ({ text }) => {
  return <button className={styles.button}>{text}</button>;
};

export default FloatingButton;
