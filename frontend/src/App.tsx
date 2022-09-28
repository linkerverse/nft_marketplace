import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MintTokenPage from "./routes/MintTokenPage";
import MyTokenPage from "./routes/MyTokenPage";
import SaleTokenPage from "./routes/SaleTokenPage";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MintTokenPage />} />
        <Route path="/" element={<MyTokenPage />} />
        <Route path="/" element={<SaleTokenPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
