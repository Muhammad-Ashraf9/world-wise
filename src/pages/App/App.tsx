import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import Login from "../Login/Login";
import Product from "../Product/Product";
import Pricing from "../Pricing/Pricing";
function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/pricing" element={<Pricing />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
