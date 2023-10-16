import styles from "./CountryList.module.css";
import CityType from "../../types/City";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import CountryItem from "../CountryItem/CountryItem";
import City from "../../types/City";
import Country from "../../types/Country";
interface CityListProps {
  cityList: CityType[];
  isLoading: boolean;
}

export default function CountryList({ cityList, isLoading }: CityListProps) {
  if (isLoading) return <Spinner />;
  if (!cityList.length) return <Message message="No cities found." />;
  const countries: Country[] = cityList.reduce((arr: Country[], city: City) => {
    if (!arr.map((el: Country) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return [...arr];
    }
  }, []);
  return (
    <div className={styles.cityList}>
      {countries.map((country) => (
        <CountryItem country={country} key={Math.random()} />
      ))}
    </div>
  );
}
