import { JSX, createContext, useEffect, useState } from "react";
import { API_URL } from "../config";
import City from "../types/City";
interface CitiesContextInterface {
  cityList: City[];
  isLoading: boolean;
}
interface CitiesProviderProps {
  children: JSX.Element | JSX.Element[];
}
export const CitiesContext = createContext<CitiesContextInterface>({
  cityList: [],
  isLoading: false,
});

export function CitiesProvider({ children }: CitiesProviderProps) {
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}cities`);
        const data = await response.json();
        setCityList(data);
      } catch (error) {
        console.error("error :>> ", error);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);
  return (
    <CitiesContext.Provider value={{ cityList, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}
