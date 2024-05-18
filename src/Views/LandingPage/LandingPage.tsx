import React from "react";
import { Link } from "react-router-dom";
import resumeSticker from "../../assets/resume.png";
import listSticker from "../../assets/investigation.png";
import styles from "./LandingPage.module.scss";

export default function LandingPage() {
  return (
    <section className={styles.container}>
      <section className={styles.section}>
        <Link className={styles.card} to="resume-builder">
          <h1 className={styles.title}>Create Your Own Resume</h1>
          <img className={styles.img} src={resumeSticker} alt="Resume" />
        </Link>
      </section>
      <section className={styles.section}>
        <Link className={styles.card} to="list-all">
          <h1 className={styles.title}>List All Created Resumes</h1>
          <img className={styles.img} src={listSticker} alt="List" />
        </Link>
      </section>
    </section>
  );
}
