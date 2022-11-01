import styled from 'styled-components';
import * as colors from 'src/styles/colors.js';

export const Container = styled.div`
  width: 100%;
  margin-top: 64px;
  height: 400px;
  padding: 20px;
  background-color: #141a1e;
`;

export const BannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: Gray;
  position: relative;
`;

export const TopLeftTriangle = styled.div`
  width: 0px;
  height: 0px;
  border-top: 60px solid #141a1e;
  border-right: 60px solid transparent;
  position: absolute;
  top: 0px;
  left: 0px;
`;

export const TopRightTriangle = styled.div`
  width: 0px;
  height: 0px;
  border-bottom: 60px solid #141a1e;
  border-left: 60px solid transparent;
  bottom: 0px;
  right: 0px;
  position: absolute;
`;

export const BannerOrderBox = styled.div`
  width: 51px;
  height: 29px;
  background-color: ${colors.bgBannerButton};
  border-radius: 6px;
  position: absolute;
  left: 16px;
  bottom: 16px;
  font-size: 14px;
  color: ${colors.textSecondary};
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;
