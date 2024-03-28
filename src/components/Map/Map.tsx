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
// interface LocationMarkerProps {
//   city: City;
// }
// function LocationMarker({ city }: LocationMarkerProps) {
//   const [position, setPosition] = useState<LatLng | null>(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position ? position : city.position}>
//       <Popup>
//         {city.country} {city.cityName}
//       </Popup>
//     </Marker>
//   );
// }

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
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position: [lat, lng] }: { position: number[] }) {
  const map = useMap();
  map.setView(latLng({ lat, lng }), 8);
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
