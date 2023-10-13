import { NavigateFunction, useNavigate } from "react-router-dom";
import styles from "./Button.module.css";
interface ButtonProps {
  className: string;
  children: string;
}
export default function Button({ className, children }: ButtonProps) {
  const navigate: NavigateFunction = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className={[styles.btn, styles[className]].join(" ")}
    >
      {children}
    </button>
  );
}
