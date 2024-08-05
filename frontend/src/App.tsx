import Home from "./pages/Home";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductCPU from "./pages/ProductCPU";
import ProductMONITOR from "./pages/ProductMONITOR";
import ProductRAM from "./pages/ProductRAM";
import ProductSTORAGE from "./pages/ProductSTORAGE";
import ProductPSU from "./pages/ProductPSU";
import ProductVGA from "./pages/ProductVGA";

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/cpu" element={<ProductCPU />} />
          <Route path="/product/monitor" element={<ProductMONITOR />} />
          <Route path="/product/ram" element={<ProductRAM />} />
          <Route path="/product/storage" element={<ProductSTORAGE />} />
          <Route path="/product/psu" element={<ProductPSU />} />
          <Route path="/product/vga" element={<ProductVGA />} />
        </Routes>
      </div>
    </Router>
  );
}
