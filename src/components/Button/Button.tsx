import styles from "./Button.module.css";
interface ButtonProps {
  type: string;
  children: string;
  onClick?: () => void;
}
export default function Button({ type, children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
