// @flow

import React, { Component } from 'react';
import {
  TextInput, TouchableOpacity, Modal, View, Text,
} from 'react-native';
import styled from 'styled-components';

import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

const CardContainer = styled(View)`
  width: 80%;
  margin-bottom: ${({ theme }) => theme.metrics.getHeightFromDP('10%')}px;
  padding: ${({ theme }) => theme.metrics.mediumSize}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const OperationTitle = styled(Text)`
  font-size: ${({ theme }) => theme.metrics.extraLargeSize * 1.2};
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.darkText};
`;

const ActionButtonsWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

const ActionButtonsContent = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const ActionButtonsText = styled(Text)`
  margin-left: ${({ theme }) => theme.metrics.extraLargeSize}
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1};
  font-family: CircularStd-Medium;
  color: ${({ theme, active }) => (active ? theme.colors.primaryColor : theme.colors.primaryColorAlpha)};
  textTransform: uppercase;
`;

const InputWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-vertical: ${({ theme }) => theme.metrics.largeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.smallSize}px;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('6%')};
  border: solid 1px ${({ theme }) => theme.colors.subText};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Input = styled(TextInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.subText,
  selectionColor: theme.colors.subText,
  underlineColorAndroid: 'transparent',
  autoCapitalize: 'none',
  autoFocus: true,
  autoCorrect: false,
  placeholder: 'Type the title of the Playlist',
  returnKeyLabel: 'done',
  returnKeyType: 'done',
}))`
  width: 100%;
  height: 100%;
  font-family: CircularStd-Book;
  color: ${({ theme }) => theme.colors.darkText};
`;

export const OPERATIONS = {
  CREATE: 'Create',
  EDIT: 'Edit',
};

const renderBottomButton = (
  title: string,
  isActive: boolean,
  action: Function,
): Object => (
  <TouchableOpacity
    disabled={!isActive}
    onPress={action}
    hitSlop={{
      bottom: appStyles.metrics.smallSize,
      right: appStyles.metrics.smallSize,
      left: appStyles.metrics.smallSize,
      top: appStyles.metrics.smallSize,
    }}
  >
    <ActionButtonsText
      active={isActive}
    >
      {title}
    </ActionButtonsText>
  </TouchableOpacity>
);

type Props = {
  onTypePlaylistTitle: Function,
  onToggleModal: Function,
  playlistTitle: string,
  mainAction: Function,
  modalMode: string,
};

const PlaylistOperationModal = ({
  onTypePlaylistTitle,
  onToggleModal,
  playlistTitle,
  mainAction,
  modalMode,
}: Props): Object => (
  <Modal
    onRequestClose={onToggleModal}
    animationType="fade"
    hardwareAccelerated
    transparent
  >
    <Container>
      <CardContainer>
        <OperationTitle>{`${modalMode} Playlist`}</OperationTitle>
        <InputWrapper>
          <Input
            onChangeText={playlistTitle => onTypePlaylistTitle(playlistTitle)}
          />
        </InputWrapper>
        <ActionButtonsWrapper>
          <ActionButtonsContent>
            {renderBottomButton('cancel', true, onToggleModal)}
            {renderBottomButton(modalMode, !!playlistTitle, mainAction)}
          </ActionButtonsContent>
        </ActionButtonsWrapper>
      </CardContainer>
    </Container>
  </Modal>
);

export default PlaylistOperationModal;
