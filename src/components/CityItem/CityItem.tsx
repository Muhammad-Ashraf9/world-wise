import styles from "./CityItem.module.css";
import City from "../../types/City";
import { Link } from "react-router-dom";
import formatDate from "../../utility/formatDate";

interface CityItemProps {
  city: City;
}
export default function CityItem({ city }: CityItemProps) {
  const {
    date,
    emoji,
    cityName,
    position: { lat, lng },
    id,
  } = city;
  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji} </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
