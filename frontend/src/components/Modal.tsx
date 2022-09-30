import React, { FC } from "react";
import styled from "styled-components";
import NailTokenCard from "./NailTokenCard";

const Wrapper = styled.div`
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
`;

const ModalTitle = styled.h2`
  color: #fff;
`;

interface IModal {
  imgUrl: string;
  imgData: any;
}
const Modal: FC<IModal> = ({ imgUrl, imgData }) => {
  console.log(imgData);
  return (
    <Wrapper>
      <CardWrapper>
        <ModalTitle>New Nail NFT Card</ModalTitle>
        <NailTokenCard imgUrl={imgUrl} imgData={imgData} />
      </CardWrapper>
    </Wrapper>
  );
};

export default Modal;
