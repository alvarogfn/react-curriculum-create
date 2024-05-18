import React from "react";
import styles from "./Textarea.module.scss";

interface props {
  label: string;
  placeholder?: string;
  error?: string;
}

const Textarea = React.forwardRef(
  ({ label, placeholder, error, ...props }: props, ref) => {
    return (
      <label className={styles.label}>
        {label}
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          {...props}
          ref={null}
        />
        {error && (
          <span key={error} className={styles.error}>
            {error}
          </span>
        )}
      </label>
    );
  }
);

export default Textarea;
