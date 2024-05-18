import React from "react";
import styles from "./Upload.module.scss";

interface props {
  label: string;
  onUpload: (data: {}) => any;
}

export default function Upload({ label, onUpload }: props) {
  const [files, setFiles] = React.useState<File | null>(null);
  const [content, setContent] = React.useState<{} | null>(null);
  const [fail, setFail] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (files) {
      let reader = new FileReader();
      reader.readAsText(files);
      reader.addEventListener("load", () => {
        try {
          if (typeof reader.result === "string")
            setContent(JSON.parse(reader.result));
        } catch (e) {
          setFail(true);
        }
      });
    }
  }, [files]);

  React.useEffect(() => {
    if (content) {
      const sucess = onUpload(content);
      if (!sucess) setFail(true);
    }
  }, [content]);

  return (
    <label className={styles.container}>
      {label}
      <input
        onChange={({ target: { files } }) => setFiles(files ? files[0] : null)}
        type="file"
        accept="application/json"
        className={styles.upload}
      />
      {fail && (
        <span className={styles.error}>File properties doesn't match.</span>
      )}
    </label>
  );
}
