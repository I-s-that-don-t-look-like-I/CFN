import {
  Box,
  Flex,
  Input,
  Select,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { useOutletContext } from 'react-router-dom';
import {
  BiMessageRoundedDetail,
  BiMailSend,
  BiShareAlt,
  BiPlusCircle,
  BiMinusCircle,
} from 'react-icons/bi';
import TableComp from '../atoms/TableComp';
import { FirebaseRead } from '../molecules/FirebaseDbManager';
import { useEffect } from 'react';

export default function ProfileMaker() {
  const [userObj, setUserObj] = useOutletContext();
  const [birthValue, birthOnChange] = useState(new Date());
  const [googleUser, setGoogleUser] = useState();

  async function getUserAccount() {
    try {
      const response = await FirebaseRead({
        _collection: 'users',
        _column: 'google_id',
        _value: userObj.email,
        _compOpt: '==',
      });
      response.forEach(doc => setGoogleUser(doc.data()));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserAccount();
  }, [userObj]);

  async function nftQuery() {
    // const query = { size: 1 };
    // const result = await caver.kas.tokenHistory.getNFTList(
    //   '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
    //   query
    // );
  }

  return (
    <Box>
      <Box>
        <Box>
          <Flex>
            <Box flexGrow={1} bgColor={'blue.300'}>
              <Flex>
                <Box bgColor={'#664F4F'} w={'260px'}>
                  <Box
                    display="flex"
                    w={'260px'}
                    h={'340px'}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text zIndex={999} position={'absolute'}>
                      프로필 사진을 등록 해주세요
                    </Text>
                    <Skeleton w={'240px'} h={'320px'}></Skeleton>
                  </Box>
                  <Box
                    w={'260px'}
                    h={'400px'}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text zIndex={999} position={'absolute'}>
                      일상 사진을 등록 해주세요
                    </Text>
                    <Skeleton w={'240px'} h={'320px'} mb={'10px'} />
                  </Box>
                </Box>
                <Box bgColor={'pink.400'} flexGrow={1}>
                  <Box
                    display={'flex'}
                    h={'50px'}
                    bgColor={'teal.400'}
                    justifyContent={'space-between'}
                  >
                    <Box display={'flex'}>
                      <Text
                        letterSpacing={'10px'}
                        ml={'20px'}
                        alignSelf={'center'}
                        fontSize={'3xl'}
                      >
                        {userObj ? userObj.displayName : '홍길동'}
                      </Text>
                      <Input
                        fontSize={'md'}
                        bottom={'5px'}
                        ml={'10px'}
                        alignSelf={'flex-end'}
                        w={'300px'}
                        placeholder={'영어 이름을 입력해주세요'}
                      ></Input>
                    </Box>
                    <Box
                      alignSelf={'center'}
                      justifySelf={'flex-end'}
                      mr={'10px'}
                    >
                      <Flex gap={2}>
                        <BiMessageRoundedDetail size={40} />
                        <BiMailSend size={40} />
                        <BiShareAlt size={40} />
                      </Flex>
                    </Box>
                  </Box>
                  <Flex h={'708px'} bgColor={'red.300'}>
                    <Box w={'360px'} bgColor={'orange.300'}>
                      <Flex direction={'column'}>
                        <Box>
                          <Text m={'10px'} fontSize={'xl'}>
                            개인 신상 정보
                          </Text>
                          <Flex
                            alignItems={'center'}
                            justifyContent={'space-around'}
                          >
                            <Text>성별 : </Text>
                            <Select
                              fontSize={'sm'}
                              w={'75px'}
                              placeholder="성별"
                              isRequired
                            >
                              <option value="남자">남자</option>
                              <option value="여자">여자</option>
                            </Select>
                            <Text>생년월일 : </Text>
                            <DatePicker
                              onChange={birthOnChange}
                              value={birthValue}
                              maxDate={new Date()}
                            />
                          </Flex>
                          <Flex alignItems={'center'}>
                            <Flex m={'10px'}>
                              <Text>키 : </Text>
                              <Input
                                fontSize={'sm'}
                                bottom={'5px'}
                                ml={'10px'}
                                alignSelf={'flex-end'}
                                w={'70px'}
                                placeholder={'키'}
                                maxLength={3}
                              />
                              <Text>cm</Text>
                            </Flex>
                            <Flex m={'10px'}>
                              <Text>몸무게 : </Text>
                              <Input
                                fontSize={'sm'}
                                bottom={'5px'}
                                ml={'10px'}
                                alignSelf={'flex-end'}
                                w={'70px'}
                                placeholder={'몸무게'}
                                maxLength={3}
                              />
                              <Text>kg</Text>
                            </Flex>
                          </Flex>
                        </Box>
                        <Spacer />
                        <Flex direction={'row'}>
                          <Box>
                            <Select
                              fontSize={'xl'}
                              w={'200px'}
                              placeholder="카테고리"
                              isRequired
                            >
                              <option value="필모그래피">필모그래피</option>
                              <option value="드라마">드라마</option>
                              <option value="뮤직비디오">뮤직비디오</option>
                              <option value="광고">광고</option>
                            </Select>
                          </Box>
                          <Box ml={3} alignSelf={'center'}>
                            <BiPlusCircle size={'25px'} />
                          </Box>
                        </Flex>
                        <Box>
                          <Flex>
                            <Text m={'10px'} fontSize={'xl'}>
                              필모그래피
                            </Text>
                            <Box ml={3} alignSelf={'center'}>
                              <Flex>
                                <BiPlusCircle size={'25px'} />
                                <BiMinusCircle size={'25px'} />
                              </Flex>
                            </Box>
                          </Flex>
                          <TableComp />
                        </Box>
                        <Spacer />
                        <Flex>
                          <Text m={'10px'} fontSize={'xl'}>
                            드라마
                          </Text>
                          <Box ml={3} alignSelf={'center'}>
                            <Flex>
                              <BiPlusCircle size={'25px'} />
                              <BiMinusCircle size={'25px'} />
                            </Flex>
                          </Box>
                        </Flex>
                        <Spacer />
                        <Flex>
                          <Text m={'10px'} fontSize={'xl'}>
                            뮤직비디오
                          </Text>
                          <Box ml={3} alignSelf={'center'}>
                            <Flex>
                              <BiPlusCircle size={'25px'} />
                              <BiMinusCircle size={'25px'} />
                            </Flex>
                          </Box>
                        </Flex>
                        <Spacer />
                        <Flex>
                          <Text m={'10px'} fontSize={'xl'}>
                            광고
                          </Text>
                          <Box ml={3} alignSelf={'center'}>
                            <Flex>
                              <BiPlusCircle size={'25px'} />
                              <BiMinusCircle size={'25px'} />
                            </Flex>
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                    <Box bgColor={'blue.600'} flexGrow={1}>
                      <Text m={'10px'}>그래프랑 NFT</Text>
                      <Text>
                        {googleUser ? googleUser.kaikasAddress : 'test'}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
