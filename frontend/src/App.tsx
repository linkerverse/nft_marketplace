import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MintTokenPage from "./routes/MintTokenPage";
import MyTokenPage from "./routes/MyTokenPage";
import SaleTokenPage from "./routes/SaleTokenPage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MintTokenPage />} />
        <Route path="/my-page" element={<MyTokenPage />} />
        <Route path="/sale" element={<SaleTokenPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
