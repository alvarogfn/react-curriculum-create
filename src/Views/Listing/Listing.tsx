import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContextType, Context } from "../../AppContext";
import { Resume } from "../../models/Resume";
import styles from "./Listing.module.scss";
import Upload from "../../components/utils/Upload/Upload";
import { formatToDate } from "brazilian-values";

export default function Listing() {
  const [resumes, setResumes] = React.useState<Resume[]>([]);
  const navigate = useNavigate();
  const { getAllResumes, updateResume } = React.useContext(
    Context
  ) as AppContextType;

  React.useEffect(() => {
    const resumeList = getAllResumes();
    setResumes(resumeList);
  }, []);

  function uploadResume(data: Resume): boolean {
    const {
      phone,
      birthdate,
      cpf,
      createdAt,
      email,
      experience,
      firstName,
      id,
      lastName,
    } = data;

    if (
      phone &&
      birthdate &&
      cpf &&
      createdAt &&
      email &&
      experience &&
      firstName &&
      id &&
      lastName
    ) {
      const id = updateResume(data);
      navigate("/resume/" + id);
      return true;
    }
    return false;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>All Resumes</h1>
      <div className={styles.upload}>
        <Upload
          label="Upload a Resume"
          onUpload={(data) => uploadResume(data as Resume)}
        />
      </div>
      <ul className={styles.list}>
        {resumes.map((resume) => (
          <li className={styles.item} key={resume.id}>
            <Link className={styles.link} to={"/resume/" + resume.id}>
              <h2 className={styles.name}>
                {resume.firstName} {resume.lastName}
              </h2>
              <p className={styles.email}>{resume.email}</p>
              <p className={styles.exp}>{resume.experience}</p>
              <p title="Created At" className={styles.createdAt}>
                Created At {formatToDate(new Date(resume.createdAt))}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
