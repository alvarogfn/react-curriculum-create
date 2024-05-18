import React from "react";
import styles from "./Select.module.scss";

interface props {
  options: { key?: string; value: string }[];
  defaultOption?: { value: string; disabled: boolean };
  label: string;
  error: string | undefined;
}

const Select = React.forwardRef(
  ({ options, defaultOption, label, error, ...props }: props, ref) => {
    return (
      <label className={styles.label}>
        {label}
        <select className={styles.input} defaultValue="" {...props} ref={null}>
          {defaultOption && (
            <option value="" disabled={true}>
              {defaultOption.value}
            </option>
          )}
          {options.map(({ key, value }) => (
            <option key={key ? key : value} value={key}>
              {value}
            </option>
          ))}
        </select>
        {error && (
          <span key={error} className={styles.error}>
            {error}
          </span>
        )}
      </label>
    );
  }
);

export default Select;
