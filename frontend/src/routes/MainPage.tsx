import React, { FC } from "react";
import styled from "styled-components";
import { API_ENDPOINTS } from "../api/ApiEndpoint";
import http from "../api/http";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;

const Button = styled.button`
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
`;

const MainPage: FC = () => {
  const createReport = () => {
    http
      .post(API_ENDPOINTS.CREATE_REPORT)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
    alert("검사결과가 생성되었습니다.");
  };

  return (
    <Wrapper>
      <h2>NFT 마켓플레이스</h2>
      <h4>메인페이지입니다.</h4>
      <Button onClick={createReport}>검사결과 생성하기</Button>
    </Wrapper>
  );
};

export default MainPage;
