import styles from "./CityItem.module.css";
import City from "../../types/City";
import { Link } from "react-router-dom";
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
interface CityItemProps {
  city: City;
}
export default function CityItem({ city }: CityItemProps) {
  const {
    date,
    emoji,
    cityName,
    position: { lat, lng },
  } = city;
  return (
    <li>
      <Link
        className={styles.cityItem}
        to={`${cityName}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji} </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
