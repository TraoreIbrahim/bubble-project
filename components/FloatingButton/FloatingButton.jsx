import { useState, useEffect } from "react";
import styles from "./FloatingButton.module.css";

const FloatingButton = () => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    setIsPulsing(true);

    return () => setIsPulsing(false);
  }, []);
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <a
        href="#"
        className={`${styles.banner_arrow} ${isPulsing ? "button-pulse" : ""}`}
      ></a>
    </div>
  );
};

export default FloatingButton;
