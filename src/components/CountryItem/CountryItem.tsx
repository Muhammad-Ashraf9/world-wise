import Country from "../../types/Country";
import styles from "./CountryItem.module.css";

interface CountryProps {
  country: Country;
}
function CountryItem({ country }: CountryProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
