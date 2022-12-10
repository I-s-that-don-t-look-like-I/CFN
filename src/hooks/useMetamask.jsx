import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { crowdfundABI } from '../hooks/contractABI.js';

export const useWallet = () => {
  const [account, setAccount] = useState('');

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

  useEffect(() => {
    getAccount();
  }, []);
  return { account, getAccount };
};

export const useWeb3 = () => {
  const [web3, setWeb3] = useState();
  const [crowdfundContract, setCrowdfundContract] = useState();

  useEffect(() => {
    if (!window.ethereum) return;
    setWeb3(new Web3(window.ethereum));
  }, []);

  useEffect(() => {
    if (!web3) return;
    setCrowdfundContract(
      new web3.eth.Contract(
        crowdfundABI,
        process.env.REACT_APP_CONTRACT_CROWDFUND_ADDRESS
      )
    );
  }, [web3]);
  return { web3, crowdfundContract };
};
