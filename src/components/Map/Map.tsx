import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LatLng, latLng } from "leaflet";
import useCities from "../../hooks/useCities";
import City from "../../types/City";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
interface LocationMarkerProps {
  city: City;
}

export default function Map() {
  const [searchParams] = useSearchParams();
  const { cityList, isLoading: isLoadingCities } = useCities();

  const {
    getPosition: getGeolocationPosition,
    isLoading: isLoadingGeolocationLocation,
    position: geolocationPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  console.log("cityList :>> ", cityList);
  console.log("mapPosition :>> ", mapPosition);
  useEffect(
    function () {
      console.log("geolocationPosition :>> ", geolocationPosition);
      if (geolocationPosition) setMapPosition(geolocationPosition);
    },
    [geolocationPosition]
  );
  useEffect(
    function () {
      console.log("lat,lng :>> ", lat, lng);
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getGeolocationPosition}>
          {isLoadingGeolocationLocation ? "Loading..." : "My Location"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={latLng({ lat: mapPosition[0], lng: mapPosition[1] })}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {!isLoadingCities &&
          cityList.map((city) => (
            <Marker position={city.position} key={city.id}>
              <Popup>
                {city.country} {city.cityName}
              </Popup>
            </Marker>
          ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position: [lat, lng] }: { position: number[] }) {
  const map = useMap();
  map.setView(latLng({ lat, lng }));
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}
function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  if (!position) return;
  return (
    <Marker position={position}>
      <Popup>
        You are here. <br /> <Button type="primary">Add to my cities</Button>
      </Popup>
    </Marker>
  );
}
