import React, { useEffect } from 'react';
import { AMANDA_DATA } from '../util/constants/amanda-data.constant';
import Layout from '../components/Layout';
import Prices from '../components/Prices';
import {
  LandingTitle,
  Occupation,
  Container,
  Background,
} from '../styles/Landing.styled';

const Landing = () => {
  const { firstName, lastName, title, priceLevels } = AMANDA_DATA;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Background />
      <Container>
        <LandingTitle>
          {firstName}
          <span>{lastName}</span>
        </LandingTitle>
        <Occupation>{title}</Occupation>
        <Prices priceLevels={priceLevels} />
      </Container>
    </Layout>
  );
};

export default Landing;
