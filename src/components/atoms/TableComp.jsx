import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { BiMinusCircle } from 'react-icons/bi';

export default function TableComp() {
  return (
    <TableContainer m={1}>
      <Table size="xs">
        <Thead>
          <Tr>
            <Th>연도</Th>
            <Th>제목</Th>
            <Th>역할</Th>
            <Th>감독</Th>
            <Th>삭제</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>2015</Td>
            <Td>뭐보노?</Td>
            <Td>여고생1</Td>
            <Td>홍길동</Td>
            <Td>
              <BiMinusCircle size={'20px'} />
            </Td>
          </Tr>
          <Tr>
            <Td>2015</Td>
            <Td>누구인가</Td>
            <Td>태리</Td>
            <Td>손기호</Td>
            <Td>
              <BiMinusCircle size={'20px'} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
