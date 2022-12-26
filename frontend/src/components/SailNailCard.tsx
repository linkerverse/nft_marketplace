import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import http from "../api/http";
import {
  mintNailTokenContract,
  saleNailTokenContract,
  web3,
} from "../constracts/web3Config";
import { API_ENDPOINTS } from "../api/ApiEndpoint";

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

  const [imgUrl, setImgUrl] = useState<string>();
  const [nailData, setNailData] = useState<any>();
  useEffect(() => {
    if (imgData) {
      http
        .post(API_ENDPOINTS.GET_NFT_DATA, { image_id_list: [Number(imgData)] })
        .then((res: any) => {
          console.log(res);
          setImgUrl(res.data.filtered_data[0].image_url);
          setNailData(res.data.filtered_data[0].image_data);
        })
        .catch((error) => console.error(error));
    }
  }, [imgData]);
  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);
  return (
    <Wrapper>
      {imgUrl && <ReportImg imgUrl={imgUrl} />}
      <ReportData>
        <h5>color</h5>
        <span>black:{nailData?.color?.black}</span>
        <span>blue:{nailData?.color?.blue}</span>
        <span>green:{nailData?.color?.green}</span>
        <span>red black:{nailData?.color?.redblack}</span>
        <span>white:{nailData?.color?.white}</span>
        <span>yellow:{nailData?.color?.yellow}</span>
        <div>
          {web3.utils.fromWei(imgPrice)} Matic
          <Button disabled={isBuyable} onClick={onClickBuy}>
            Buy
          </Button>
        </div>
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
