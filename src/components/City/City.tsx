import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import Spinner from "../Spinner/Spinner";
import formatDate from "../../utility/formatDate";
import Button from "../Button/Button";

function City() {
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}cities/${id}`);
        const data = await response.json();
        setCity(data);
      } catch (error) {
        console.log("error :>> ", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (!city) return <p>No cities Found</p>;
  const { cityName, emoji, date, notes } = city;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <Button type="back" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}

export default City;
