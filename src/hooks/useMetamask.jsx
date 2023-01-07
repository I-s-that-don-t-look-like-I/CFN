import { useEffect, useState } from 'react';
import Web3 from 'web3';
import {
  DataABI,
  DataUserABI,
  CFABI,
  rewardABI,
} from '../hooks/contractABI.js';

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
  const [DBContract, setDBContract] = useState();
  const [DBUserContract, setDBUserContract] = useState();
  const [crowdfundContract, setCrowdfundContract] = useState();
  const [rewardContract, setRewardContract] = useState();
  const [ownerPayContract, setOwnerPayContract] = useState();

  useEffect(() => {
    if (!window.ethereum) return;
    setWeb3(new Web3(window.ethereum));
  }, []);

  const getContracts = async () => {
    try {
      if (!web3) return;
      await setDBContract(
        new web3.eth.Contract(
          DataABI,
          process.env.REACT_APP_CONTRACT_DATA_ADDRESS
        )
      );
      await setDBUserContract(
        new web3.eth.Contract(
          DataUserABI,
          process.env.REACT_APP_CONTRACT_DATAUSER_ADDRESS
        )
      );
      await setCrowdfundContract(
        new web3.eth.Contract(
          CFABI,
          process.env.REACT_APP_CONTRACT_CROWDFUND_ADDRESS
        )
      );
      await setRewardContract(
        new web3.eth.Contract(
          rewardABI,
          process.env.REACT_APP_CONTRACT_REWARD_ADDRESS
        )
      );
      await getOwnerPayContract();
      return {
        web3,
        DBContract,
        DBUserContract,
        crowdfundContract,
        rewardContract,
        getContracts,
      };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContracts();
  }, [web3]);

  function getOwnerPayContract() {
    const ethers = require('ethers');
    const provider = new ethers.providers.AlchemyProvider(
      'goerli',
      process.env.REACT_APP_ALCHEMY_KEY
    );
    const signer = new ethers.Wallet(process.env.REACT_APP_PVK, provider);
    const payContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_CROWDFUND_ADDRESS,
      CFABI,
      signer
    );
    setOwnerPayContract(payContract);
  }

  return {
    web3,
    DBContract,
    DBUserContract,
    crowdfundContract,
    rewardContract,
    ownerPayContract,
    getContracts,
  };
};
