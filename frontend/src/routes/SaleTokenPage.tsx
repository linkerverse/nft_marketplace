import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { INailTokenCardProps } from "../components/NailTokenCard";
import SaleNailCard from "../components/SailNailCard";
import {
  mintNailTokenContract,
  saleNailTokenContract,
} from "../constracts/web3Config";

interface SaleNailProps {
  account: string;
}

interface IMyNailCard {
  nailTokenId: string;
  nailType: string;
  nailPrice: string;
}

const SaleTokenPage: FC<SaleNailProps> = ({ account }) => {
  const [saleNailCardArray, setSaleNailCardArray] = useState<IMyNailCard[]>();

  const getOnSaleNailTokens = async () => {
    try {
      const onSaleNailTokenArrayLength = await saleNailTokenContract.methods
        .getOnSaleNailTokenArrayLength()
        .call();

      const tempOnSailArray: IMyNailCard[] = [];

      for (let i = 0; i < parseInt(onSaleNailTokenArrayLength); i++) {
        const nailTokenId = await saleNailTokenContract.methods
          .onSaleNailTokenArray(i)
          .call();

        const nailType = await mintNailTokenContract.methods.nailTypes(
          nailTokenId
        );

        const nailPrice = await saleNailTokenContract.methods
          .nailTokenPrices(nailTokenId)
          .call();

        tempOnSailArray.push({ nailTokenId, nailType, nailPrice });
      }
      setSaleNailCardArray(tempOnSailArray);
      console.log(tempOnSailArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnSaleNailTokens();
  }, []);

  return (
    <Wrapper>
      <TokenBox>
        <BoxHeading>SaleTokenPage</BoxHeading>
        <ReportListBox>
          {saleNailCardArray &&
            saleNailCardArray.map((p, i) => (
              <SaleNailCard
                // imgUrl={p.image_url}
                // imgData={nailCardDatas[i]?.image_data}
                imgPrice={p.nailPrice ? p.nailPrice : "NoData"}
                account={account}
                nailTokenId={p.nailTokenId}
                key={i}
                getOnSaleNailTokens={getOnSaleNailTokens}
              />
            ))}
        </ReportListBox>
      </TokenBox>
    </Wrapper>
  );
};

export default SaleTokenPage;

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
