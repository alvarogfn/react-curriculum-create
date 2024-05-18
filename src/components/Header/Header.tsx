import React from "react";
import { Link } from "react-router-dom";
import icon from "../../assets/Resume.png";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logoContent}>
        <h1>
          <Link className={styles.link} to="/">
            Resumes
          </Link>
        </h1>
      </div>
      <nav className={styles.pages}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.anchor} to="resume-builder">
              Create
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.anchor} to="list-all">
              List All
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
