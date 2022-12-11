import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { crowdfundABI, userABI, fundABI } from '../hooks/contractABI.js';

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
  const [userContract, setUserContract] = useState();
  const [fundContract, setFundContract] = useState();

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
    setUserContract(
      new web3.eth.Contract(
        userABI,
        process.env.REACT_APP_CONTRACT_USER_ADDRESS
      )
    );
    setFundContract(
      new web3.eth.Contract(
        fundABI,
        process.env.REACT_APP_CONTRACT_FUND_ADDRESS
      )
    );
  }, [web3]);
  return { web3, crowdfundContract, userContract, fundContract };
};
