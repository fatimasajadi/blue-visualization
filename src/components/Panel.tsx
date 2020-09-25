import React from "react";
import styles from "./Panel.module.scss";

interface Props {
  title: string;
  double?: boolean;
  children: React.ReactNode;
}

function Panel({ children, title, double }: Props) {
  return (
    <div className={`${styles.wrapper} ${double ? styles.double : ""}`}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default Panel;
