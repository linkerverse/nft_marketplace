import { AbiItem } from "web3-utils";
import Web3 from "web3";

const mintNailTokenAbi: AbiItem[] = [];
const saleNailTokenAbi: AbiItem[] = [];

export const mintNailTokenAddress = "";
export const saleNailTokenAddress = "";

export const web3 = new Web3(window.ethereum);

export const mintNailTokenContract = new web3.eth.Contract(
  mintNailTokenAbi,
  mintNailTokenAddress
);

export const saleNailTokenContract = new web3.eth.Contract(
  saleNailTokenAbi,
  saleNailTokenAddress
);
