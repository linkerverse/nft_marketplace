import React, { FC, useState } from "react";
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

const SignUpBox = styled.div`
  background-color: #a6c8ff;
  padding: 100px;
  border-radius: 20px;
`;

const BoxHeading = styled.h2`
  font-size: 30px;
  color: #fff;
`;

const SignUpForm = styled.form`
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
  width: 350px;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
`;

const SignUpButton = styled.button`
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

const SignUpPage: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호 확인이 잘못 작성되었습니다.");
      return;
    }
    http
      .post(API_ENDPOINTS.SIGN_UP, { name, email, password })
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

    console.log(name, email, password, confirmPassword);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "name-input") {
      setName(e.currentTarget.value);
    }

    if (e.currentTarget.id === "email-input") {
      setEmail(e.currentTarget.value);
    }
    if (e.currentTarget.id === "password-input") {
      setPassword(e.currentTarget.value);
    }
    if (e.currentTarget.id === "confirm-password-input") {
      setConfirmPassword(e.currentTarget.value);
    }
  };
  return (
    <Wrapper>
      <SignUpBox>
        <BoxHeading>Sign-up</BoxHeading>
        <hr />
        <SignUpForm onSubmit={handleSubmit}>
          <InputLabel htmlFor="name-input">
            name
            <input
              id="name-input"
              type="name"
              onChange={handleInputChange}
              value={name}
            ></input>
          </InputLabel>
          <InputLabel htmlFor="email-input">
            Email
            <input
              id="email-input"
              type="email"
              onChange={handleInputChange}
              value={email}
            ></input>
          </InputLabel>
          <InputLabel htmlFor="password-input">
            Password
            <input
              id="password-input"
              type="password"
              onChange={handleInputChange}
              value={password}
            />
          </InputLabel>
          <InputLabel htmlFor="confirm-password-input">
            Confirm Password
            <input
              id="confirm-password-input"
              type="password"
              onChange={handleInputChange}
              value={confirmPassword}
            />
          </InputLabel>
          <ButtonContainer>
            <SignUpButton type="button">돌아가기</SignUpButton>
            <SignUpButton type="submit">회원가입</SignUpButton>
          </ButtonContainer>
        </SignUpForm>
      </SignUpBox>
    </Wrapper>
  );
};

export default SignUpPage;
