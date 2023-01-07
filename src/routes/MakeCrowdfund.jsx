import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  InputLeftAddon,
  Textarea,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Ether from 'src/components/atoms/Ether';
import { useWallet, useWeb3 } from 'src/hooks/useMetamask';

export default function MakeCrowdfund() {
  const [filmName, setFilmName] = useState('');
  const [director, setDirector] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [vst, setVst] = useState(0);
  const [vet, setVet] = useState(0);
  const [fst, setFst] = useState(0);
  const [fet, setFet] = useState(0);
  const { crowdfundContract, getContracts } = useWeb3();
  const { account, getAccount } = useWallet();

  useEffect(() => {
    getContracts();
    getAccount();
  }, []);

  async function sendCrowdfundData() {
    console.log(vst, vet, fst, fet);
    await crowdfundContract.methods
      .makeCrowdfund(
        filmName + '__' + director,
        imgUrl,
        synopsis,
        (targetAmount * 10 ** 18).toString(),
        vst,
        vet,
        fst,
        fet
      )
      .send({
        from: account,
        value: '1000000000000000',
      });
  }

  return (
    <Box ml={'10px'}>
      <form type="submit">
        <Flex direction={'column'} gap={'10px'}>
          <Flex gap={'10px'}>
            <Input
              placeholder="영화 제목"
              w={'300px'}
              borderColor="orange.300"
              borderWidth={'3px'}
              onChange={e => {
                setFilmName(e.target.value);
              }}
            />
            <Input
              placeholder="감독명"
              w={'300px'}
              borderColor="orange.300"
              borderWidth={'3px'}
              onChange={e => {
                setDirector(e.target.value);
              }}
            />
          </Flex>
          <Input
            placeholder="이미지 첨부"
            w={'610px'}
            borderColor="orange.300"
            borderWidth={'3px'}
            onChange={e => {
              setImgUrl(e.target.value);
            }}
          />
          <InputGroup w={'610px'}>
            <Textarea
              value={synopsis}
              onChange={e => {
                setSynopsis(e.target.value);
              }}
              placeholder="시놉시스"
              size="md"
              borderColor="orange.300"
              borderWidth={'3px'}
              h={'150px'}
            />
          </InputGroup>
          <InputGroup w={'300px'}>
            <InputLeftElement children={<Ether />} />
            <Input
              placeholder="목표 금액"
              borderColor="orange.300"
              borderWidth={'3px'}
              onChange={e => {
                setTargetAmount(e.target.value);
              }}
            />
            <InputRightAddon
              children="단위 : Ether"
              borderColor="orange.300"
              borderWidth={'3px'}
              backgroundColor={'orange.300'}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon
              children="심사 시작"
              borderColor="orange.300"
              borderWidth={'3px'}
              backgroundColor={'orange.300'}
            />
            <Input
              placeholder="심사 시작"
              size="md"
              type="datetime-local"
              borderColor="orange.300"
              borderWidth={'3px'}
              w={'260px'}
              onChange={e => {
                setVst(new Date(e.target.value).getTime() / 1000);
              }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon
              children="심사 종료"
              borderColor="orange.300"
              borderWidth={'3px'}
              backgroundColor={'orange.300'}
            />
            <Input
              placeholder="심사 종료"
              size="md"
              type="datetime-local"
              borderColor="orange.300"
              borderWidth={'3px'}
              w={'260px'}
              onChange={e => {
                setVet(new Date(e.target.value).getTime() / 1000);
              }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon
              children="펀딩 시작"
              borderColor="orange.300"
              borderWidth={'3px'}
              backgroundColor={'orange.300'}
            />
            <Input
              placeholder="펀딩 시작"
              size="md"
              type="datetime-local"
              borderColor="orange.300"
              borderWidth={'3px'}
              w={'260px'}
              onChange={e => {
                setFst(new Date(e.target.value).getTime() / 1000);
              }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon
              children="펀딩 종료"
              borderColor="orange.300"
              borderWidth={'3px'}
              backgroundColor={'orange.300'}
            />
            <Input
              placeholder="펀딩 종료"
              size="md"
              type="datetime-local"
              borderColor="orange.300"
              borderWidth={'3px'}
              w={'260px'}
              onChange={e => {
                setFet(new Date(e.target.value).getTime() / 1000);
              }}
            />
          </InputGroup>
          <Button w={'100px'} onClick={sendCrowdfundData}>
            전송
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
