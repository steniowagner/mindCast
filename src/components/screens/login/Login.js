// @flow

import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components';

import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import Header from './components/Header';

const Wrapper = styled(View)`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  background-color: #111;
`;

class Login extends Component {
  render() {
    return (
      <Wrapper>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
          animated
        />
        <Header />
        <RegisterComponent />
      </Wrapper>
    );
  }
}

export default Login;
