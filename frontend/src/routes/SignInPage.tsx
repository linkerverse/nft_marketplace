import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API_ENDPOINTS } from "../api/ApiEndpoint";
import http from "../api/http";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const SignInBox = styled.div`
  background-color: #a6c8ff;
  padding: 100px;
  border-radius: 20px;
`;

const BoxHeading = styled.h2`
  font-size: 30px;
  color: #fff;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding: 50px;
`;

const InputLabel = styled.label`
  font-size: 20px;
  font-weight: 800;
  color: white;
  width: 300px;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
`;

const SignInButton = styled.button`
padding: 10px 20px;
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

a {
  font-size: 18px;
  text-decoration: none;
  color: #000;
`;

const SignUpBox = styled.div`
  a {
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    color: #7799ff;
  }

  a:active {
    opacity: 0.6;
  }
`;

const SignUpQuestion = styled.p``;

interface ISetUser {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const SignInPage: FC<ISetUser> = ({ setUsername }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") {
      alert("이메일이 입력되지 않았습니다.");
      return;
    }
    if (password === "") {
      alert("비밀번호가 입력되지 않았습니다.");
      return;
    }

    http
      .post(API_ENDPOINTS.SIGN_IN, { email, password })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.token.access_token);
        localStorage.setItem("userId", res.data.token.user_id);
        localStorage.setItem("username", res.data.token.username);
        setUsername(res.data.token.username);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "email-input") {
      setEmail(e.currentTarget.value);
    }
    if (e.currentTarget.id === "password-input") {
      setPassword(e.currentTarget.value);
    }
  };
  return (
    <Wrapper>
      <SignInBox>
        <BoxHeading>Sign-in</BoxHeading>
        <hr />
        <SignInForm onSubmit={handleSubmit}>
          <InputLabel htmlFor="email-input">
            Email
            <input
              id="email-input"
              type="email"
              onChange={handleInputChange}
            ></input>
          </InputLabel>
          <InputLabel htmlFor="password-input">
            Password
            <input
              id="password-input"
              type="password"
              onChange={handleInputChange}
            ></input>
          </InputLabel>
          <ButtonContainer>
            <SignInButton type="button">돌아가기</SignInButton>
            <SignInButton type="submit">로그인</SignInButton>
          </ButtonContainer>
        </SignInForm>
        <hr />
        <SignUpBox>
          <SignUpQuestion>
            아직 NFT Marketplace에 아이디가 없으신가요?
          </SignUpQuestion>
          <Link to="/sign-up">NFT Marketplace에 회원가입하기</Link>
        </SignUpBox>
      </SignInBox>
    </Wrapper>
  );
};

export default SignInPage;
