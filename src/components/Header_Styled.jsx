import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

export const Container = styled.header`
  width: 100%;
  height: 64px;
  background-color: #141a1e;
  position: fixed;
  top: 0px;
  left: auto;
  right: 0px;
  display: flex;
  padding: 16px 24px;
  align-items: center;
  z-index: 1100;
`;

export const LogoWrapper = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

export const SearchBarWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  border-left-width: 1px;
  border-color: hsla(0, 0%, 100%, 0.12);
  border-style: solid;
`;

export const GrayRoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.bgSecondary};
`;

export const WalletBox = styled(GrayRoundBox)`
  background-color: ${colors.textYellow};
  margin-right: 8px;
`;

export const ProfileBox = styled(GrayRoundBox)`
  background-color: ${colors.textYellow};
  margin-right: 8px;
`;

export const SearchIconWrapper = styled.div`
  margin-left: 16px;
`;
