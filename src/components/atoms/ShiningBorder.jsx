import styled from 'styled-components';

export const ShiningCard = styled.div`
  border-radius: 50px;
  background: #feebc8;
  box-shadow: 5px 5px 10px #d8c8aa, -5px -5px 10px #ffffe6;

  margin-top: 5px;
  padding: 3px 3px;
  border: none;
  outline: none;
  color: #000;
  font-family: inherit;
  font-weight: 500;
  font-size: 20px;
  position: relative;
  z-index: 0;
  border-radius: 15px;

  ::after {
    content: '';
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
  /* glow */
  ::before {
    content: '';
    background: linear-gradient(
      45deg,
      #ff0000,
      #d89230,
      #ff00c8,
      #d89230,
      #ff0000,
      #d89230,
      #ff00c8,
      #d89230
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 600%;
    z-index: -1;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    filter: blur(8px);
    animation: glowing 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
    opacity: 0;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }

    50% {
      background-position: 400% 0;
    }

    100% {
      background-position: 0 0;
    }
  }

  /* hover */
  :hover::before {
    opacity: 1;
  }

  :active:after {
    background: transparent;
  }
`;
