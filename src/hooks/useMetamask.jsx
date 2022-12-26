import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { crowdfundABI, userABI, rewardABI } from '../hooks/contractABI.js';

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
  const [rewardContract, setRewardContract] = useState();

  useEffect(() => {
    if (!window.ethereum) return;
    setWeb3(new Web3(window.ethereum));
  }, []);

  const getContracts = async () => {
    try {
      if (!web3) return;
      await setCrowdfundContract(
        new web3.eth.Contract(
          crowdfundABI,
          process.env.REACT_APP_CONTRACT_CROWDFUND_ADDRESS
        )
      );
      await setUserContract(
        new web3.eth.Contract(
          userABI,
          process.env.REACT_APP_CONTRACT_USER_ADDRESS
        )
      );
      await setRewardContract(
        new web3.eth.Contract(
          rewardABI,
          process.env.REACT_APP_CONTRACT_REWARD_ADDRESS
        )
      );
      return {
        web3,
        crowdfundContract,
        userContract,
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
  return {
    web3,
    crowdfundContract,
    userContract,
    rewardContract,
    getContracts,
  };
};
