import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask.jsx';

export default function Solidity() {
  const { crowdfundContract } = useWeb3();
  const { account, getAccount } = useWallet();

  const hello = async () => {
    const response = await crowdfundContract.methods.helloWorld().call();
    console.log(response);
  };

  useEffect(() => {
    getAccount();
  }, []);

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
