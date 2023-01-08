import React, { useEffect, useState, useRef } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Heading,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FirebaseRead } from '../molecules/FirebaseDbManager';

export default function CrowdTest() {
  const [filmData, setFilmData] = useState();

  useEffect(() => {
    async function getActorsSimpleData() {
      let films = []; // films 배열 생성

      try {
        const response = await FirebaseRead({
          _collection: 'crowdfunding.film',
          _column: 'film_id',
          _compOpt: '>=',
          _value: 0,
        });
        response.docs.map(doc => {
          films.push(doc.data());
        });
        // films.sort((a, b) => (a.end_date < b.end_date ? 1 : -1));
        console.log(films);
        setFilmData(films);
      } catch (error) {
        console.error(error);
      }
    }
    getActorsSimpleData();
  }, []);
  return (
    <>
      <Box>
        <Heading>펀딩 리스트 게시판</Heading>
        <VisuallyHidden>This will be hidden</VisuallyHidden>
      </Box>
      <TableContainer>
        <Table size="m">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>제목</Th>
              <Th>작성자</Th>
              <Th>상태</Th>
              <Th>등록일</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filmData
              ? filmData.map(film => (
                  <Tr>
                    <Td>{film.film_id}</Td>
                    <Td>{film.film_name}</Td>
                    <Td>{film.film_director}</Td>
                    <Td></Td>
                    <Td>{film.request_date * 1000}</Td>
                  </Tr>
                ))
              : ''}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}
