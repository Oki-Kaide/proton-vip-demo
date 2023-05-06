import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Chatbox from '../components/Chatbox';
import styled from 'styled-components';

export const ArtistPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #141414;
  height: 100%;
  padding-left: 5%;
  overflow: hidden;

  @media (max-width: 920px) {
    padding-left: 0;
    padding-bottom: 48px;
  }
`;

export const ArtistImg = styled.img`
  margin-top: 100px;
  border-radius: 20px;
  width: 803px;
  height: 692px;
  object-fit: cover;
  object-position: 90%;

  @media (max-width: 920px) {
    display: none;
  }
`;

const Artist = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <ArtistPageContainer>
        <Chatbox />
        <ArtistImg src="/girl.png" alt="artist" />
      </ArtistPageContainer>
    </Layout>
  );
};

export default Artist;
