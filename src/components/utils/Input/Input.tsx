import React from "react";
import styles from "./Input.module.scss";
import { IMaskInput } from "react-imask";

interface props {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: Function;
  mask?: string | RegExp;
}

const Input = React.forwardRef(
  (
    {
      label,
      name,
      onChange,
      placeholder,
      type,
      onBlur,
      mask = /[\s\s]*/,
      error,
    }: props,
    ref
  ) => {
    const [value, setValue] = React.useState("");

    function handleAccept(value: string) {
      setValue(value);
      onChange(value);
    }

    return (
      <label className={styles.label}>
        {label}
        <IMaskInput
          mask={mask as RegExp}
          unmask
          onAccept={(value) => handleAccept(value as string)}
          placeholder={placeholder}
          type={type}
          value={value}
          onBlur={() => onBlur()}
          className={`${styles.input} ${error && styles.inputError}`}
          ref={ref}
          name={name}
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

export default Input;
