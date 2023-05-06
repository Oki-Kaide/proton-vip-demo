import styled from 'styled-components';
import { Button } from '../../styles/Button.styled';

export const Container = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  background-color: #141414;
  position: fixed;
  z-index: 2;
  overflow: hidden;

  @media (max-width: 920px) {
    padding: 0 3%;
    height: 65px;
  }
`;

export const SearchBar = styled.div`
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1f2229;
  width: 45%;
  height: 40px;
  border-radius: 4px;
  box-shadow: 0 2px 6px -4px rgba(141, 141, 148, 0.48),
    0 0 2px 0 rgba(141, 141, 148, 0.16);
  i,
  svg {
    width: 20px;
    height: 20px;
    object-fit: contain;
    margin: 10px;
  }
  input {
    background-color: #1f2229;
    outline: none;
    border: none;
    width: 100%;
    font-family: Avenir;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: normal;
    color: #8e98a9;
  }
  @media (max-width: 920px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  width: 200px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 920px) {
    width: 150px;
    padding-right: 0px;
  }

  @media (max-width: 340px) {
    width: 125px;
    padding-right: 0px;
  }
`;

export const NavRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.85);
  }

  * {
    margin: 10px;

    @media (max-width: 920px) {
      margin-right: 0;
    }
  }

  @media (max-width: 920px) {
    max-width: 160px;
  }

  @media (max-width: 320px) {
    max-width: 150px;
  }
`;

export const NavRightText = styled.span`
  color: #ffffff;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: Avenir;
  margin: 10px;

  @media (max-width: 920px) {
    margin-right: 0;
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
`;

export const NavButton = styled(Button)`
  width: 100px;

  @media (max-width: 920px) {
    width: 90px;
    height: 35px;
    text-align: center;
    font-size: 12px;
    margin-left: 0;
  }
`;

export const NavProfile = styled.img`
  @media (max-width: 920px) {
    margin-right: 8px;
  }
`;
