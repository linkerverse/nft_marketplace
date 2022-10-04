import React, { FC, useState } from "react";
import styled from "styled-components";
import NailTokenCard from "./NailTokenCard";

interface IWrapper {
  isVisible: boolean;
}

const Wrapper = styled.div<IWrapper>`
  display: ${(props) => (props.isVisible ? "black" : "none")};
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;

const CardWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #a6c8ff;
  padding: 100px;
  border-radius: 20px;
  button {
    position: absolute;
    top: 10%;
    right: 10%;
    background-color: transparent;
    border: none;
    font-size: 40px;
    font-weight: 900;
    cursor: pointer;
    &:hover {
      color: #ff9999;
      opacity: 0.6;
    }

    &:active {
      opacity: 1;
    }
  }
`;

const ModalTitle = styled.h2`
  color: #fff;
`;

interface IModal {
  imgUrl: string;
  imgData: any;
}
const Modal: FC<IModal> = ({ imgUrl, imgData }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  return (
    <Wrapper isVisible={isVisible}>
      <CardWrapper>
        <ModalTitle>New Nail NFT Card</ModalTitle>
        <NailTokenCard imgUrl={imgUrl} imgData={imgData} />
        <button onClick={() => setIsVisible(false)}>✕</button>
      </CardWrapper>
    </Wrapper>
  );
};

export default Modal;
