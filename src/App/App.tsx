import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Product from "../pages/Product/Product";
import Pricing from "../pages/Pricing/Pricing";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../pages/AppLayout/AppLayout";
import CityList from "../components/CityList/CityList";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import CountryList from "../components/CountryList/CountryList";
import City from "../components/City/City";
import Form from "../components/Form/Form";
function App() {
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}cities`);
        const data = await response.json();
        console.log(data);
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
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />

          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" />} />
            <Route
              path="cities"
              element={<CityList cityList={cityList} isLoading={isLoading} />}
            />
            <Route path="cities/:cityName" element={<City />} />
            <Route
              path="countries"
              element={
                <CountryList cityList={cityList} isLoading={isLoading} />
              }
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
