import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  SelectField,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from 'src/fbase';
import {
  FirebaseRead,
  FirebaseWrite,
  FirebaseReadMultiWhere,
} from '../molecules/FirebaseDbManager';
import DatePicker from 'react-date-picker';
import styled from 'styled-components';
import { dbService, storageService } from 'src/fbase';
import { v4 as uuidv4 } from 'uuid';

const SDatePicker = styled(DatePicker)`
  margin-top: 1.5rem;
  width: 300px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 12px;
`;

export default function CrowdTest({ userObj }) {
  const [film_director, setfilm_director] = useState('');
  const [film_name, setfilm_name] = useState('');
  const [film_target_amount, setfilm_target_amount] = useState();
  const [min_amount, setmin_amount] = useState(300);
  const [status, setstatus] = useState('');
  const [contents, setcontents] = useState('');
  const [attachment, setAttachment] = useState('');
  const [film, setFilm] = useState();
  const [isFunding, setIsFunding] = useState(false);
  const [fundAmt, setFundAmt] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onSubmit = async event => {
    event.preventDefault();
    if (
      film_director === '' ||
      film_name === '' ||
      film_target_amount === 0 ||
      min_amount === 0 ||
      startDate === '' ||
      endDate === ''
    ) {
      return;
    }
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const requestFundingObj = {
      film_director: film_director,
      request_date: Date.now(),
      fund_maker_id: userObj.uid,
      attachmentUrl,
      isFunding: false,
      film_target_amount: film_target_amount,
      min_amount: min_amount,
      start_date: startDate,
      end_date: endDate,
    };
    await dbService.collection('crowdfunding.funding').add(requestFundingObj);
    setfilm_director('');
    setAttachment('');
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setfilm_director(value);
  };
  const onChange2 = event => {
    const {
      target: { value },
    } = event;
    setfilm_name(value);
  };
  const onChange3 = event => {
    const {
      target: { value },
    } = event;
    setfilm_target_amount(value);
  };
  const onChange4 = event => {
    const {
      target: { value },
    } = event;
    setcontents(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment('');

  return (
    <form onSubmit={onSubmit}>
      <Box h={'100vh'}>
        <Flex flexDirection={'row'} m={3} gap={3}>
          <Flex direction={'column'} gap={3}>
            <Box bgColor="orange.400" p={4}>
              <Grid
                templateRows={'repeat(6,1fr)'}
                templateColumns={'repeat(4,1fr)'}
                gap={6}
              >
                <Input
                  value={film_director}
                  onChange={onChange}
                  type="text"
                  placeholder="감독명"
                  required
                  w={150}
                />
                <Input
                  value={film_name}
                  onChange={onChange2}
                  type="text"
                  placeholder="영화 제목"
                  required
                  w={150}
                />
                <Input
                  value={film_target_amount}
                  onChange={onChange3}
                  type="number"
                  placeholder="목표 금액"
                  required
                  w={150}
                />

                <SDatePicker
                  dateFormat="yyyy년 MM월 dd일"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  minDate={new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="희망 시작일"
                />
                <SDatePicker
                  dateFormat="yyyy년 MM월 dd일"
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="희망 종료일"
                />
                <Input
                  value={min_amount}
                  onChange={onChange}
                  type="number"
                  placeholder="최소 펀딩 금액"
                  required
                  w={150}
                />
                <GridItem rowSpan={3} colSpan={4}>
                  <Input
                    value={contents}
                    onChange={onChange4}
                    h={'100%'}
                    type="text"
                    placeholder="시놉시스"
                    required
                  />
                </GridItem>
                <Input
                  id="attach-file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{
                    opacity: 1,
                  }}
                />
                <Input type="submit" value="크라우드 펀딩 신청" />
              </Grid>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </form>
  );
}
