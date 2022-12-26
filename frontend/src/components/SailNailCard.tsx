import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import {
  mintNailTokenContract,
  saleNailTokenContract,
  web3,
} from "../constracts/web3Config";

interface SaleNailCardProps {
  nailType?: string;
  imgPrice: string;
  nailTokenId: string;
  imgUrl?: string;
  imgData?: any;
  account: string;
  getOnSaleNailTokens: () => Promise<void>;
}

interface IReportImg {
  imgUrl: string;
}

const SaleNailCard: FC<SaleNailCardProps> = ({
  nailType,
  nailTokenId,
  imgPrice,
  imgUrl,
  imgData,
  account,
  getOnSaleNailTokens,
}) => {
  const [isBuyable, setIsBuyable] = useState<boolean>(false);

  const getNailTokenOwner = async () => {
    try {
      console.log("try");
      const response = await mintNailTokenContract.methods
        .ownerOf(nailTokenId)
        .call();
      setIsBuyable(
        response.toLocaleLowerCase() === account.toLocaleLowerCase()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBuy = async () => {
    try {
      if (!account) return;

      const response = await saleNailTokenContract.methods
        .purchaseNailToken(nailTokenId)
        .send({ from: account, value: imgPrice });
      console.log(response);
      console.log(response.status);

      if (response.status) {
        getNailTokenOwner();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNailTokenOwner();
  }, []);
  return (
    <Wrapper>
      {imgUrl && <ReportImg imgUrl={imgUrl} />}
      <ReportData>
        <h5>color</h5>
        <span>black:{imgData?.color?.black}</span>
        <span>blue:{imgData?.color?.blue}</span>
        <span>green:{imgData?.color?.green}</span>
        <span>red black:{imgData?.color?.redblack}</span>
        <span>white:{imgData?.color?.white}</span>
        <span>yellow:{imgData?.color?.yellow}</span>
        {web3.utils.fromWei(imgPrice)} Matic
        <Button disabled={isBuyable} onClick={onClickBuy}>
          Buy
        </Button>
      </ReportData>
    </Wrapper>
  );
};

export default SaleNailCard;

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

const Button = styled.button``;
