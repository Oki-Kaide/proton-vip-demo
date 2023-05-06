import Layout from '../components/Layout';
import React from 'react';
import styled from 'styled-components';

const LoadingMessage = styled.p`
  display: block;
  margin-top: 15rem;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 2rem;
`;

export default function Loading() {
  return (
    <Layout>
      <LoadingMessage>Loading...</LoadingMessage>
    </Layout>
  );
}
