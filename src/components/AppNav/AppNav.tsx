import { Link } from "react-router-dom";
import Styles from "./AppNav.module.css";
import Logo from "../Logo/Logo";
export default function AppNav() {
  return (
    <nav className={Styles.nav}>
      <Logo />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/pricing">pricing</Link>
        </li>
        <li>
          <Link to="/product">product</Link>
        </li>
      </ul>
    </nav>
  );
}
