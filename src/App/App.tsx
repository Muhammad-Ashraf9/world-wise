import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Product from "../pages/Product/Product";
import Pricing from "../pages/Pricing/Pricing";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../pages/AppLayout/AppLayout";
import CityList from "../components/CityList/CityList";

import CountryList from "../components/CountryList/CountryList";
import City from "../components/City/City";
import Form from "../components/Form/Form";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace={true} to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
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
