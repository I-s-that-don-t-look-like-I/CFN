import { Box, Flex, Grid, GridItem, Input } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { authService } from 'src/fbase';
import DatePicker from 'react-date-picker';
import styled from 'styled-components';
import { dbService, storageService } from 'src/fbase';
import { v4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

export default function CrowdTest() {
  const [userObj, setUserObj] = useOutletContext();
  const [film_director, setfilm_director] = useState('');
  const [film_name, setfilm_name] = useState('');
  const [film_target_amount, setfilm_target_amount] = useState();
  const [min_amount, setmin_amount] = useState(300);
  // const [status, setstatus] = useState('');
  const [contents, setcontents] = useState('');
  const [attachment, setAttachment] = useState('');
  // const [film, setFilm] = useState();
  // const [isFunding, setIsFunding] = useState(false);
  // const [fundAmt, setFundAmt] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    async function getUserObj() {
      await setUserObj(authService.currentUser);
    }
    getUserObj();
  }, [userObj]);

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
    let imgUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        'data_url'
      );
      console.log(response);
      imgUrl = await getDownloadURL(response.ref);
    }
    const requestFundingObj = {
      film_director: film_director,
      request_date: Date.now(),
      fund_maker_id: userObj.uid,
      imgUrl,
      isFunding: false,
      film_target_amount: film_target_amount,
      min_amount: min_amount,
      start_date: startDate,
      end_date: endDate,
      contents: contents,
    };
    // await dbService.collection('crowdfunding.funding').add(requestFundingObj);
    await addDoc(collection(dbService, 'crowdfunding.film'), requestFundingObj);
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
  const [movieContent, setMovieContent] = useState({
    title: '',
    content: '',
  });
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
                  value={film_name}
                  onChange={onChange2}
                  type="text"
                  placeholder="영화 제목"
                  required
                  w={1000}
                />
                <Input
                  value={film_director}
                  onChange={onChange}
                  type="text"
                  placeholder="감독명"
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
                  {/* <Input
                    value={contents}
                    onChange={onChange4}
                    h={'100%'}
                    type="text"
                    placeholder="시놉시스"
                    required
                  /> */}
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                      setMovieContent({
                        ...movieContent,
                        content: data,
                      });
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  />
                </GridItem>
                {/* <Input
                  id="attach-file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{
                    opacity: 1,
                  }}
                /> */}
                <Input type="submit" value="크라우드 펀딩 신청" />
              </Grid>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </form>
  );
}
