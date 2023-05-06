import styled from 'styled-components';

export const LandingTitle = styled.h1`
  font-size: 59px;
  font-size: 3rem;
  letter-spacing: 8.43px;
  font-family: Charter-Roman;
  color: #ffffff;
  text-align: center;
  line-height: 3rem;
  position: relative;
  padding-bottom: 1.5rem;

  span {
    display: block;
  }

  :after {
    content: '';
    background: #e3c681;
    width: 100px;
    height: 3px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  @media (max-width: 920px) {
    margin-top: 5rem;
  }
`;

export const Occupation = styled.h3`
  font-size: 1rem;
  color: #fff;
  text-align: center;
  display: block;
  margin: 1.5rem 0;
  font-family: Avenir;
`;

export const Container = styled.div`
  margin-top: 10%;
  overflow: hidden;
`;

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('/girl.png') no-repeat;
  background-size: cover;
  z-index: -1;
  pointer-events: none;

  :before {
    content: '';
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;

    background-image: linear-gradient(
      rgba(0, 0, 0, 0.45) 0%,
      rgba(0, 0, 0, 0.55) 20%,
      rgba(0, 0, 0, 0.65) 40%,
      rgba(0, 0, 0, 0.75) 60%,
      rgba(0, 0, 0, 0.85) 80%,
      rgba(0, 0, 0, 1) 100%
    );
  }

  :after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      rgba(66, 58, 58, 0.45) 0%,
      rgba(0, 0, 0, 0.55) 20%,
      rgba(15, 15, 15, 0.65) 40%,
      rgba(25, 25, 25, 0.75) 60%,
      rgba(25, 25, 25, 0.85) 80%,
      rgb(25, 25, 25) 100%
    );
  }
`;
