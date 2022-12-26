import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { API_ENDPOINTS } from "../api/ApiEndpoint";
import http from "../api/http";
import Modal from "../components/Modal";
import NailTokenCard from "../components/NailTokenCard";
import Spinner from "../components/Spinner";
import { mintNailTokenContract } from "../constracts/web3Config";

interface IMyReportList {
  image_id: number;
  image_data: any;
  image_url: string;
}

interface MintPageProps {
  account: string;
}

const MintTokenPage: FC<MintPageProps> = ({ account }) => {
  const [selectedReportId, setSelectedReportId] = useState<string>("");
  const [selectedReportIndex, setSelectedReportIndex] = useState<number>();
  const [newNailType, setNewNailType] = useState<string>("");
  const [newNailImg, setNewNailImg] = useState<string>("");
  const [newNailData, setNewNailData] = useState<any>({});
  const [myReportList, setMyReportList] = useState<IMyReportList[]>([]);
  const [isMinting, setIsMinting] = useState<boolean>(false);
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

  const handleRadioButton = (
    e: React.FormEvent<HTMLInputElement>,
    i: number
  ) => {
    setSelectedReportId(e.currentTarget.value);
    setSelectedReportIndex(i);
    console.log(e.currentTarget.id);
  };

  const onClickMint = async () => {
    try {
      if (!account) return;
      setIsMinting(true);
      const response = await mintNailTokenContract.methods
        .mintNailToken(selectedReportId)
        .send({ from: account });
      console.log(response);

      if (response.status) {
        const balanceLength = await mintNailTokenContract.methods
          .balanceOf(account)
          .call();

        const nailTokenId = await mintNailTokenContract.methods
          .tokenOfOwnerByIndex(account, parseInt(balanceLength.length))
          .call();

        const nailType = await mintNailTokenContract.methods
          .nailTypes(nailTokenId)
          .call();

        setNewNailType(nailType);
        if (myReportList && selectedReportIndex) {
          setNewNailImg(myReportList[selectedReportIndex].image_url);
          setNewNailData(myReportList[selectedReportIndex].image_data);
        }
      }
      setIsMinting(false);
    } catch (error) {
      setIsMinting(false);
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <MintBox>
        <BoxHeading>MintTokenPage</BoxHeading>
        <ReportListBox>
          {myReportList.map((p, i) => (
            <ReportCard key={i} htmlFor={String(i)}>
              <input
                type="radio"
                name="report"
                onChange={(e) => handleRadioButton(e, i)}
                id={String(i)}
                value={String(p.image_id)}
              />
              <NailTokenCard imgUrl={p.image_url} imgData={p?.image_data} />
            </ReportCard>
          ))}
          {newNailType ? (
            <Modal imgData={newNailData} imgUrl={newNailImg}></Modal>
          ) : isMinting ? (
            <Spinner></Spinner>
          ) : (
            <Button onClick={onClickMint}>NFT 생성</Button>
          )}
        </ReportListBox>
      </MintBox>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
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

const ReportCard = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
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

export default MintTokenPage;
