import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import cfnImage from 'src/assets/img/CFN.png';
import Divider from 'src/components/atoms/Divider.jsx';
import { Box, Spacer } from '@chakra-ui/react';

const LogoImage = styled.img`
  height: 30px;
  margin-bottom: 30px;
  margin-right: 20px;
`;

const FooterTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
`;

const FooterText = styled.span`
  color: ${colors.textSecondary};
  font-size: 14px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  margin-top: 26px;
`;

export default function Footer() {
  return (
    <Box mt={10} bgColor="black" p={'16px'} w={'100%'}>
      <Box display={'flex'}>
        <Box>
          <Box display={'flex'}>
            <LogoImage src={cfnImage} />
            <FooterTextWrapper>
              <FooterText>대표</FooterText>
              <FooterText>Team Loud-Idle</FooterText>
            </FooterTextWrapper>
          </Box>
          <Box>
            <FooterTextWrapper>
              <FooterText>사업자 등록번호</FooterText>
              <FooterText>123-45-67890</FooterText>
            </FooterTextWrapper>
            <FooterTextWrapper>
              <FooterText>주소</FooterText>
              <FooterText>서울 종로구 </FooterText>
            </FooterTextWrapper>
            <FooterTextWrapper>
              <FooterText>이메일</FooterText>
              <FooterText>supporter@cfn.org</FooterText>
            </FooterTextWrapper>
            <FooterTextWrapper>
              <FooterText>연락처</FooterText>
              <FooterText>02-1234-5678</FooterText>
            </FooterTextWrapper>
          </Box>
        </Box>
        <Spacer />
        <Box>
          <FooterLinks>
            <FooterText>이용약관</FooterText>
            <Divider />
            <FooterText>개인정보처리방침</FooterText>
            <Divider />
            <FooterText>자주묻는질문</FooterText>
          </FooterLinks>
        </Box>
      </Box>
    </Box>
  );
}
