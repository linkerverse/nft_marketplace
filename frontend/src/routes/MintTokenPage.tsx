import React, { FC, useEffect, useState } from "react";
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

const MintBox = styled.div`
  background-color: #a6c8ff;
  padding: 100px;
  border-radius: 20px;
`;

const BoxHeading = styled.h2`
  font-size: 30px;
  color: #fff;
`;

const ReportListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReportCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
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

interface IReportImg {
  imgUrl: string;
}

interface IMyReportList {
  image_id: number;
  image_data: any;
  image_url: string;
}

const MintTokenPage: FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<number>(-1);
  const [myReportList, setMyReportList] = useState<IMyReportList[]>([]);
  useEffect(() => {
    http
      .get(API_ENDPOINTS.GET_REPORT, {})
      .then((res) => {
        setMyReportList(res.data.all_id);
        console.log(myReportList);
        console.log(res.data.all_id);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRadioButton = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.id);
  };
  return (
    <Wrapper>
      <MintBox>
        <BoxHeading>MintTokenPage</BoxHeading>
        <ReportListBox>
          {myReportList.map((p, i) => (
            <ReportCard key={i}>
              <input
                type="radio"
                name="report"
                onChange={handleRadioButton}
                id={String(p.image_id)}
              />
              <ReportImg imgUrl={p.image_url} />
              <ReportData>
                <h5>color</h5>
                <span>black:{p?.image_data.color.black}</span>
                <span>blue:{p?.image_data.color.blue}</span>
                <span>green:{p?.image_data.color.green}</span>
                <span>red black:{p?.image_data.color["red-black"]}</span>
                <span>white:{p?.image_data.color["white "]}</span>
                <span>yellow:{p?.image_data.color.yellow}</span>
              </ReportData>
            </ReportCard>
          ))}
          <Button>NFT 생성</Button>
        </ReportListBox>
      </MintBox>
    </Wrapper>
  );
};

export default MintTokenPage;
