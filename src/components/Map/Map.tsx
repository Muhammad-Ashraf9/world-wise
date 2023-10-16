import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <>
      <div
        className={styles.mapContainer}
        onClick={() => {
          navigate("form");
        }}
      >
        Map
        {lat + "" + lng + ""}
      </div>
      <Button
        type="primary"
        onClick={() => setSearchParams({ lat: "2323", lng: "33434" })}
      >
        change position
      </Button>
    </>
  );
}
