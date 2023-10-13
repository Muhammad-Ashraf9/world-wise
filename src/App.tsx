import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Homepage />}></Route>
            <Route index path="/login" element={<p>ggg</p>}></Route>
            <Route index path="/product" element={<p>hhh</p>}></Route>
            <Route index path="/pricing" element={<p>32323</p>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
