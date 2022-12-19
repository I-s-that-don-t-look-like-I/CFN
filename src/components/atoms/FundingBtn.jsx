import styled from 'styled-components';

export const FundBtn = styled.button`
  margin-top: 10px;
  padding: 0.9em 1.6em;
  border: none;
  outline: none;
  color: #fff;
  font-family: inherit;
  font-weight: 500;
  font-size: 17px;
  position: relative;
  z-index: 0;
  border-radius: 15px;

  ::after {
    content: '';
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(46, 46, 46);
    left: 0;
    top: 0;
    border-radius: 10px;
  }
  /* hover */
  :hover::before {
    opacity: 1;
  }

  :active:after {
    background: transparent;
  }

  :active {
    color: #000;
    font-weight: bold;
  }
`;
