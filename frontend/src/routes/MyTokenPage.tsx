import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { API_ENDPOINTS } from "../api/ApiEndpoint";
import http from "../api/http";
import NailTokenCard from "../components/NailTokenCard";
import {
  mintNailTokenContract,
  saleNailTokenAddress,
} from "../constracts/web3Config";

type IMyTokenPageProps = {
  account: string;
};

type IMyNailCard = {
  nailTokenId: string;
  nailTokenPrice: string;
  nailHealthData: string;
};

const MyTokenPage: FC<IMyTokenPageProps> = ({ account }) => {
  const [nailCardArray, setNailCardArray] = useState<IMyNailCard[]>([]);
  const [nailImageIdArray, setNailImageIdArray] = useState<number[]>([]);
  const [nailCardDatas, setNailCardDatas] = useState<any>({});
  const [saleStatus, setSaleStatus] = useState<boolean>(false);
  const getNftList = async () => {
    try {
      if (!account) return;

      const balanceLength = await mintNailTokenContract.methods
        .balanceOf(account)
        .call();

      if (balanceLength === "0") return;

      const tempNailCardArray: IMyNailCard[] = [];

      const response = await mintNailTokenContract.methods
        .getNailTokens(account)
        .call();

      const newNailImageIdArray: number[] = [];

      response.map((v: IMyNailCard) => {
        tempNailCardArray.push({
          nailTokenId: v.nailTokenId,
          nailTokenPrice: v.nailTokenPrice,
          nailHealthData: v.nailHealthData,
        });
        newNailImageIdArray.push(Number(v.nailHealthData));
      });

      setNailCardArray(tempNailCardArray);
      setNailImageIdArray(newNailImageIdArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getIsApprovedForAll = async () => {
    try {
      const response = await mintNailTokenContract.methods
        .isApprovedForAll(account, saleNailTokenAddress)
        .call();

      if (response) {
        setSaleStatus(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickApproveToggle = async () => {
    try {
      if (!account) return;
      const response = await mintNailTokenContract.methods
        .setApprovalForAll(saleNailTokenAddress, !saleStatus)
        .send({ from: account });

      if (response.status) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account) return;
    getIsApprovedForAll();
    getNftList();
  }, [account]);

  useEffect(() => {
    console.log(nailCardArray);
    if (nailImageIdArray.length) {
      console.log(nailImageIdArray);
      http
        .post(API_ENDPOINTS.GET_NFT_DATA, { image_id_list: nailImageIdArray })
        .then((res) => {
          console.log(res);
          setNailCardDatas(res.data.filtered_data);
        })
        .catch((error) => console.error(error));
    }
  }, [nailImageIdArray]);
  return (
    <Wrapper>
      <TokenBox>
        <BoxHeading>MintTokenPage</BoxHeading>
        <span>
          Sale Status : {saleStatus ? "True" : "False"}
          <button onClick={onClickApproveToggle}>
            {saleStatus ? "Cancel" : "Approve"}
          </button>
        </span>
        <ReportListBox>
          {nailCardArray.map((p, i) => (
            <NailTokenCard
              imgUrl={nailCardDatas[i]?.image_url}
              imgData={nailCardDatas[i]?.image_data}
              imgPrice={p.nailTokenPrice ? p.nailTokenPrice : "NoData"}
              account={account}
              saleStatus={saleStatus}
              nailTokenId={p.nailTokenId}
              key={i}
            />
          ))}
        </ReportListBox>
      </TokenBox>
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

const TokenBox = styled.div`
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

export default MyTokenPage;
