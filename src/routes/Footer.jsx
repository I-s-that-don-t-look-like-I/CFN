import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';
import modernLionImage from 'src/assets/img/cfn_logo.png';
import Divider from 'src/components/atoms/Divider.jsx';

const Container = styled.div`
  margin-top: 100px;
  background-color: ${colors.bgBlack};
  padding: 16px;
`;

const ModernLionLogoImage = styled.img`
  height: 14px;
  margin-bottom: 14px;
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
    <Container>
      <ModernLionLogoImage src={modernLionImage} />
      <FooterTextWrapper>
        <FooterText>대표이사</FooterText>
        <FooterText>ㅁㅁㅁ</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>사업자 등록번호</FooterText>
        <FooterText>ㅁㅁㅁ-ㅁㅁ-ㅁㅁㅁㅁㅁ</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>주소</FooterText>
        <FooterText>서울 종로구 </FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>이메일</FooterText>
        <FooterText>ㅁㅁㅁㅁㅁㅁㅁ@ㅁㅁㅁㅁㅁㅁㅁ.io</FooterText>
      </FooterTextWrapper>
      <FooterTextWrapper>
        <FooterText>전화번호</FooterText>
        <FooterText>02-0000-0000</FooterText>
      </FooterTextWrapper>
      <FooterLinks>
        <FooterText>이용약관</FooterText>
        <Divider />
        <FooterText>개인정보처리방침</FooterText>
        <Divider />
        <FooterText>자주묻는질문</FooterText>
      </FooterLinks>
    </Container>
  );
}
