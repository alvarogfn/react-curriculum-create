import { formatToCPF, formatToDate, formatToPhone } from "brazilian-values";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContextType, Context } from "../../AppContext";
import { Resume } from "../../models/Resume";
import styles from "./ResumeDetails.module.scss";

export default function ResumeDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = React.useState<Resume | null>(null);
  const { getResumeById, deleteResumeById, exportResumeById } =
    React.useContext(Context) as AppContextType;

  React.useEffect(() => {
    const id = params["id"] || "";
    const resume = getResumeById(id);
    if (resume === null) navigate("/");
    setResume(resume);
  }, [params, getResumeById, setResume]);

  function deleteResume(id: string) {
    deleteResumeById(id);
    navigate("/list-all");
  }

  if (resume === null) return null;

  return (
    <section className={styles.container}>
      <h1 className={styles.fullName}>
        {resume.firstName} {resume.lastName}
      </h1>
      <p className={styles.email}>{resume.email}</p>
      <div className={styles.item}>
        <p className={styles.label}>Birthdate: </p>
        <p className={styles.value}>
          {formatToDate(new Date(resume.birthdate))}
        </p>
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Gender: </p>
        <p className={styles.value}>{resume.gender || "Not Specified"}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.label}>CPF: </p>
        <p className={styles.value}>{formatToCPF(resume.cpf)}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Telephone: </p>
        <p className={styles.value}>{formatToPhone(resume.phone)}</p>
      </div>
      <div className={styles.item}>
        <p className={styles.label}>Experience: </p>
        <p className={styles.experience}>{resume.experience}</p>
      </div>
      <p className={styles.createdAt}>
        Created At {formatToDate(new Date(resume.createdAt))}
      </p>
      <div className={styles.buttons}>
        <button
          className={styles.delete}
          onClick={() => deleteResume(resume.id)}
        >
          Delete
        </button>
        <button
          className={styles.download}
          onClick={() => exportResumeById(resume.id)}
        >
          Download
        </button>
      </div>
    </section>
  );
}
