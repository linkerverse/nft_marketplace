import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MintPage from "./routes/mintPage";
import MyNFTPage from "./routes/MyNFTPage";
import SellingPage from "./routes/SellingPage";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MintPage />} />
        <Route path="/my-nft" element={<MyNFTPage />} />
        <Route path="/selling" element={<SellingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
