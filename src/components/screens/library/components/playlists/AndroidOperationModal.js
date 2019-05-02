// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity, TextInput, Modal, View, Text,
} from 'react-native';
import styled from 'styled-components';
import appStyles from '~/styles';

const AndroidAlertContainer = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const CardContainer = styled(View)`
  width: 80%;
  justify-content: space-between;
  padding-horizontal: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-bottom: ${({ theme }) => theme.metrics.largeSize}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CardTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.mediumSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2}px;
  color: ${({ theme }) => theme.colors.dark};
`;

const ErrorMessage = styled(Text)`
  font-family: CircularStd-Book;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.subText};
`;

const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.subText,
  selectionColor: theme.colors.subText,
  underlineColorAndroid: theme.colors.primaryColor,
  autoCapitalize: 'none',
  autoFocus: true,
  autoCorrect: false,
  placeholder: 'Type the name of the Playlist',
  returnKeyLabel: 'done',
  returnKeyType: 'done',
}))`
  margin-bottom: ${({ theme }) => theme.metrics.largeSize * 1.5}px;
  font-family: CircularStd-Book;
  color: ${({ theme }) => theme.colors.darkText};
`;

const BottomButtonsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonText = styled(Text)`
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  color: ${({ theme }) => theme.colors.primaryColor};
`;

type Props = {
  onTypePlaylistTitle: Function,
  toggleModal: Function,
  playlistTitle: string,
  mainAction: Function,
  error: string,
  mode: string,
};

const AndroidOperationModal = ({
  onTypePlaylistTitle,
  playlistTitle,
  toggleModal,
  mainAction,
  error,
  mode,
}: Props): Object => (
  <Modal
    onRequestClose={toggleModal}
    animationType="slide"
    hardwareAccelerated
    transparent
  >
    <AndroidAlertContainer>
      <CardContainer>
        <View>
          <CardTitle>{`${mode} Playlist`}</CardTitle>
          {!!error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            onChangeText={text => onTypePlaylistTitle(text)}
            value={playlistTitle}
          />
        </View>
        <BottomButtonsWrapper>
          <TouchableOpacity
            onPress={toggleModal}
          >
            <ButtonText>CANCEL</ButtonText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: appStyles.metrics.extraLargeSize * 1.5,
            }}
            onPress={() => mainAction(null)}
          >
            <ButtonText>{mode.toUpperCase()}</ButtonText>
          </TouchableOpacity>
        </BottomButtonsWrapper>
      </CardContainer>
    </AndroidAlertContainer>
  </Modal>
);

export default AndroidOperationModal;
