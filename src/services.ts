import axios from "axios";

export const submitContract = async (
  contractAddress: any,
  startBlock: number,
  contractABI: string,
  userName: string,
  indexerName: string,
  description: string
) => {
  const response = await axios.post("http://localhost:8080/contracts", {
    contractAddress,
    startBlock,
    contractABI,
    userName,
    indexerName,
    description,
  });
  return response.data;
};
