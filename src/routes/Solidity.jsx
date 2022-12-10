import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import Web3 from 'web3';
import { crowdfundABI } from '../hooks/contractABI.js';

export default function Solidity() {
  const [account, setAccount] = useState('');
  const [crowdfundContract, setCrowdfundContract] = useState();

  useEffect(() => {
    if (!window.ethereum) return;
    const getAccount = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          setAccount(accounts[0]);
        } else {
          alert('INSTALL METAMASK!!');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAccount();
  }, []);

  useEffect(() => {
    const getWeb3 = async () => {
      const web3 = new Web3(window.ethereum);
      const response = await new web3.eth.Contract(
        crowdfundABI,
        process.env.REACT_APP_CONTRACT_CROWDFUND_ADDRESS
      );
      setCrowdfundContract(response);
      console.log('Contract');
      console.log(crowdfundContract);
    };

    if (account) getWeb3();
  }, [account]);

  const hello = async () => {
    const response = await crowdfundContract.methods.helloWorld().call();
    console.log(response);
  };

  return (
    <Box>
      <Box>
        <Text>{account}</Text>
        <Button
          onClick={() => {
            hello();
          }}
        >
          HELLO
        </Button>
      </Box>
    </Box>
  );
}
