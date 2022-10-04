import React, { FC } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerItem = styled.div`
  width: 150px;
  height: 150px;
  background-color: #a6c8ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation rotate 3s linear infinite;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Spinner: FC = () => {
  return (
    <Wrapper>
      <SpinnerItem>Now Minting...</SpinnerItem>
    </Wrapper>
  );
};

export default Spinner;
