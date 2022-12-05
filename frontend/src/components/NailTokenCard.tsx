import React, { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { saleNailTokenContract, web3 } from "../constracts/web3Config";

interface INailTokenCardProps {
  imgUrl: string;
  imgData: any;
  imgPrice?: any;
  account?: string;
  saleStatus?: boolean;
  nailTokenId?: string;
}

interface IReportImg {
  imgUrl: string;
}

const NailTokenCard: FC<INailTokenCardProps> = ({
  imgUrl,
  imgData,
  imgPrice,
  account,
  saleStatus,
  nailTokenId,
}) => {
  const [sellPrice, setSellPrice] = useState<string>("");
  const [myNailPrice, setMyNailPrice] = useState<string>(imgPrice);

  const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setSellPrice(e.target.value);
  };

  const onClickSell = async () => {
    try {
      if (!account || !saleStatus) return;
      console.log(nailTokenId, typeof nailTokenId);
      console.log(sellPrice, typeof sellPrice);
      console.log(web3.utils.toWei(sellPrice, "ether"));
      const response = await saleNailTokenContract.methods
        .setForSaleNailToken(nailTokenId, web3.utils.toWei(sellPrice, "ether"))
        .send({ from: account });

      if (response.status) {
        setMyNailPrice(web3.utils.toWei(sellPrice, "ether"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <ReportImg imgUrl={imgUrl} />
      <ReportData>
        <h5>color</h5>
        <span>black:{imgData?.color?.black}</span>
        <span>blue:{imgData?.color?.blue}</span>
        <span>green:{imgData?.color?.green}</span>
        <span>red black:{imgData?.color?.redblack}</span>
        <span>white:{imgData?.color?.white}</span>
        <span>yellow:{imgData?.color?.yellow}</span>
        {imgPrice && (
          <div>
            {imgPrice === "NoData" ? (
              <SellingBox>
                <PriceBox>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={onChangeSellPrice}
                  />
                  <span>MATIC</span>
                </PriceBox>
                <button onClick={onClickSell}>Sell</button>
              </SellingBox>
            ) : (
              `price : ${web3.utils.fromWei(myNailPrice)} MATIC`
            )}
          </div>
        )}
      </ReportData>
    </Wrapper>
  );
};

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

const SellingBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  input {
    height: 1.5rem;
    width: 2rem;
  }
  span {
    margin-left: 3px;
  }
`;

export default NailTokenCard;
