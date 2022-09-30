import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./routes/MainPage";
import MintTokenPage from "./routes/MintTokenPage";
import MyTokenPage from "./routes/MyTokenPage";
import SaleTokenPage from "./routes/SaleTokenPage";
import SignInPage from "./routes/SignInPage";
import SignUpPage from "./routes/SignUpPage";

const App: FC = () => {
  const [username, setUsername] = useState("");
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAccount();
  }, [account]);

  useEffect(() => {
    const loginedUser = localStorage.getItem("username");
    if (loginedUser) {
      setUsername(loginedUser);
    }
  }, []);
  return (
    <BrowserRouter>
      <Header username={username} setUsername={setUsername} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mint" element={<MintTokenPage account={account} />} />
        <Route path="/my-page" element={<MyTokenPage />} />
        <Route path="/sale" element={<SaleTokenPage />} />
        <Route
          path="/sign-in"
          element={<SignInPage setUsername={setUsername} />}
        />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
