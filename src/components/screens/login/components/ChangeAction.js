// @flow

import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

import DefaultButton from '~/components/common/DefaultButton';
import DefaultText from './DefaultText';
import appStyles from '~/styles';

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  onNavigateToMainStack: Function,
  onPressActionButton: Function,
  changeActionText: string,
  questionText: string,
  buttonText: string,
};

const ChangeAction = ({
  onNavigateToMainStack,
  onPressActionButton,
  changeActionText,
  questionText,
  buttonText,
}: Props): Object => (
  <Wrapper>
    <Row>
      <DefaultText
        color={appStyles.colors.white}
        text={questionText}
      />
      <TouchableOpacity
        onPress={onPressActionButton}
      >
        <DefaultText
          color={appStyles.colors.primaryColor}
          text={` ${changeActionText}!`}
        />
      </TouchableOpacity>
    </Row>
    <DefaultButton
      onPress={onNavigateToMainStack}
      text={buttonText}
      size="large"
    />
  </Wrapper>
);

export default ChangeAction;
