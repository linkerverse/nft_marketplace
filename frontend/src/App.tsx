import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MintTokenPage from "./routes/MintTokenPage";
import MyTokenPage from "./routes/MyTokenPage";
import SaleTokenPage from "./routes/SaleTokenPage";
import SignInPage from "./routes/SignInPage";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MintTokenPage />} />
        <Route path="/my-page" element={<MyTokenPage />} />
        <Route path="/sale" element={<SaleTokenPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
