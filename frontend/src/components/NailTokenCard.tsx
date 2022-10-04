import React, { FC, useState } from "react";
import styled from "styled-components";

interface INailTokenCardProps {
  imgUrl: string;
  imgData: any;
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ReportImg = styled.div<IReportImg>`
  background-image: ${(props) => `url(${props.imgUrl})`};
  background-size: cover;
  background-position: center;
  width: 100px;
  height: 100px;
`;

const ReportData = styled.div`
  span {
    margin-right: 5px;
  }
`;

interface IReportImg {
  imgUrl: string;
}

const NailTokenCard: FC<INailTokenCardProps> = ({ imgUrl, imgData }) => {
  return (
    <Wrapper>
      <ReportImg imgUrl={imgUrl} />
      <ReportData>
        <h5>color</h5>
        <span>black:{imgData.color.black}</span>
        <span>blue:{imgData.color.blue}</span>
        <span>green:{imgData.color.green}</span>
        <span>red black:{imgData.color["red-black"]}</span>
        <span>white:{imgData.color["white "]}</span>
        <span>yellow:{imgData.color.yellow}</span>
      </ReportData>
    </Wrapper>
  );
};

export default NailTokenCard;
