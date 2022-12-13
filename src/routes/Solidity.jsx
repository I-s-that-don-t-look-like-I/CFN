import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask.jsx';

export default function Solidity() {
  const { crowdfundContract } = useWeb3();
  const { account, getAccount } = useWallet();
  const [txt, setTxt] = useState('');

  async function helloWorld() {
    const response = await crowdfundContract.methods.helloWorld().call();
    console.log(response);
    setTxt(txt + '////' + response);
  }

  const payFund = async () => {
    const response = await crowdfundContract.methods
      .setFund('IDLESTORY#11TEAM')
      .send({
        from: account,
        value: 100000,
      });
    console.log(response);
    setTxt(txt + '////' + response);
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <Box>
      <Box>
        <Text>{account}</Text>
        <Button onClick={helloWorld}>HELLO</Button>
        <Button onClick={payFund}>PAY</Button>
        <Text>RESPONSE</Text>
        <Text>{txt}</Text>
      </Box>
    </Box>
  );
}
