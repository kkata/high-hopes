import styles from "./RadioButtonGroup.module.css";

type RadioButtonGroupProps = {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
};

export const RadioButtonGroup = ({
  options,
  selectedOption,
  onChange,
}: RadioButtonGroupProps) => {
  return (
    <div className={styles.wrapper}>
      {options.map((option) => (
        <label className={styles.label} key={option}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
            className={styles.input}
          />
          {option}
        </label>
      ))}
    </div>
  );
};
