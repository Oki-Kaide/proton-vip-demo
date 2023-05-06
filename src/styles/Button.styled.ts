import styled from 'styled-components';

export const Button = styled.button`
  width: 296px;
  height: 48px;
  opacity: 0.4;
  border-radius: 4px;
  background-color: #e3c782;
  font-family: Avenir;
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: 3px;
  text-align: center;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  outline: none;

  :hover {
    cursor: pointer;
    opacity: 1;
  }

  :focus {
    border: 3px solid white;
  }

  @media (max-width: 920px) {
    opacity: 1;
  }
`;
