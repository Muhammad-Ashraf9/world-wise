import styles from "./CityList.module.css";
import CityType from "../../types/City";
import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
interface CityListProps {
  cityList: CityType[];
  isLoading: boolean;
}
export default function CityList({ cityList, isLoading }: CityListProps) {
  if (isLoading) return <Spinner />;
  if (!cityList.length) return <Message message="No cities found." />;
  return (
    <div className={styles.cityList}>
      {cityList.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}
