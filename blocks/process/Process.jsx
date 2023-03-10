import React from "react";
import Grid from "../../components/grid/Grid";
import styles from "./Process.module.css";

const Process = () => {
  return (
    <div className={styles.process} id="process">
      <h1 className={styles.process_h1}>
        Let's Go !! <span className={styles.blur}></span>
      </h1>
      <Grid />
    </div>
  );
};

export default Process;
