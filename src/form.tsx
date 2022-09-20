import React, { useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "./firebase";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import Web3 from "web3";
import axios from "axios";
import { submitContract } from "./services";
import { useNavigate } from "react-router-dom";

const apikey = "UBY73PQ1HIHCY9D5348318DFK92ZIP723E";

const Form = () => {
  const [contractAddress, setContractAddress] = React.useState("");
  const [contractABI, setContractABI] = React.useState("");
  const [contractABIUrl, setContractABIUrl] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [indexerName, setInderName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [startBlock, setStartBlock] = React.useState(0);
  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc.ankr.com/eth_rinkeby")
  );
  let navigate = useNavigate();
  const storageRef = ref(storage, `/contracts/${contractAddress}`);
  const fetchABI = async (address: string) => {
    const response = await axios.get(
      `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apikey}`
    );
    return response.data.result;
  };

  const isContractAddress = async (address: string) => {
    const isAddress = await web3.eth.getCode(address);
    console.log(
      "🚀 ~ file: form.tsx ~ line 13 ~ isContractAddress ~ isAddress",
      isAddress
    );
    return isAddress.length > 5;
  };

  useEffect(() => {
    if (contractAddress.length === 42) {
      isContractAddress(contractAddress)
        .then((result) => {
          console.log(result, "is contract address");
          if (result) {
            fetchABI(contractAddress).then((abi) => {
              setContractABI(abi);
              uploadString(storageRef, abi).then((snapshot) => {
                console.log("Uploaded contract's ABI!");
              });
              getDownloadURL(storageRef).then((url) => {
                console.log(url, "url");
                setContractABIUrl(url);
              });
            });
          }
        })
        .catch((err) => {
          console.log(err, "is not contract address");
        });
    }
  }, [contractAddress]);

  return (
    <div>
      <h1>Data Indexer Form</h1>
      <TextField
        label="Contract Address"
        margin="normal"
        onChange={(e) => {
          setContractAddress(e.target.value);
        }}
        sx={{
          width: "50%",
          mx: 3,
        }}
      />

      <TextField
        label="User Name"
        margin="normal"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        sx={{
          width: "50%",
          mx: 3,
        }}
      />

      <TextField
        label="Indexer Name"
        margin="normal"
        onChange={(e) => {
          setInderName(e.target.value);
        }}
        sx={{
          width: "50%",
          mx: 3,
        }}
      />

      <TextField
        label="Description"
        margin="normal"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        sx={{
          width: "50%",
          mx: 3,
        }}
      />

      <TextField
        label="Start Block"
        margin="normal"
        type="number"
        onChange={async (e) => {
          if (parseInt(e.target.value) < (await web3.eth.getBlockNumber())) {
            setStartBlock(Number(e.target.value));
          }
        }}
        sx={{
          width: "50%",
          mx: 3,
        }}
      />
      <p>Contract ABI</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <textarea
          id="message"
          placeholder="Contract ABI"
          onChange={(e) => {
            setContractABI(e.target.value);
          }}
          value={contractABI}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 justify-cen"
          style={{ width: "50%" }}
        ></textarea>
      </div>

      <Button
        variant="contained"
        sx={{ mt: 2, width: "50%", height: "3rem" }}
        onClick={(e) => {
          console.log(
            "file: form.tsx ~ line 104 ~ Form ~ contractABIUrl",
            contractABIUrl
          );

          submitContract(
            contractAddress,
            startBlock,
            contractABIUrl,
            userName,
            indexerName,
            description
          ).then((res) => {
            navigate(`/`);
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default Form;
