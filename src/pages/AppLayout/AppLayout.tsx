import styles from "./AppLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import { CitiesProvider } from "../../contexts/CitiesContext";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <CitiesProvider>
        <Sidebar />
        <Map />
      </CitiesProvider>
    </div>
  );
}
