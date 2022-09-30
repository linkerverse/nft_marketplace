import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const SiteLogo = styled.h1`
  font-size: 40px;
  font-weight: 800;
  cursor: pointer;
  margin: 0;
  grid-column: span 3;

  a {
    color: #a6c8ff;
    text-decoration: none;
  }

  a:hover {
    opacity: 0.6;
  }

  a:active {
    opacity: 0.8;
  }
`;
const Blank = styled.div`
  grid-column: span 1;
`;

const Nav = styled.nav`
  grid-column: span 5;
  display: flex;
  justify-content: space-around;
  align-items: center;

  a {
    color: #000;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 700;
    border-radius: 10px;
  }
  a:hover {
    color: #a6c8ff;
  }

  a:active {
    opacity: 0.6;
  }
`;

const LoginButton = styled(Link)`
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 18px;
  text-decoration: none;
  color: #000;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 10px 20px;

  &:hover {
    background-color: #a6c8ff;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`;

const LogoutButton = styled.button`
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #a6c8ff;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  span {
    font-size: 18px;
    text-decoration: none;
    color: #000;
  }
`;

const Username = styled.span`
  grid-column: span 1;
  padding: 10px 20px;
  strong {
    font-weight: 700;
    font-size: 30px;
  }
`;

interface IuserData {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const Header: FC<IuserData> = ({ username, setUsername }: IuserData) => {
  console.log(username);

  const handleClickLogout = () => {
    setUsername("");
    localStorage.setItem("refreshToken", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("username", "");
  };
  return (
    <Wrapper>
      <SiteLogo>
        <Link to="/">NFT Marketplace</Link>
      </SiteLogo>
      <Blank />
      <Nav>
        <Link to="/mint">Mint</Link>
        <Link to="/my-page">My Page</Link>
        <Link to="/sale">Sale Page</Link>
      </Nav>
      {username === "" ? (
        <>
          <Blank />
          <LoginButton to="/sign-in">로그인하기</LoginButton>
        </>
      ) : (
        <>
          <Username>
            <strong>{username}</strong>님 환영합니다.
          </Username>
          <LogoutButton onClick={handleClickLogout}>
            <span>로그아웃</span>
          </LogoutButton>
        </>
      )}
    </Wrapper>
  );
};

export default Header;
