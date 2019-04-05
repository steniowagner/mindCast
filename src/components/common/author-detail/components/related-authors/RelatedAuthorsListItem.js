// @flow

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as AuthorCreators } from '~/store/ducks/author';

const Wrapper = styled(TouchableOpacity)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('35%')}px;
  margin-right: ${({ theme }) => theme.metrics.mediumSize}px;
`;

const Image = styled(FastImage).attrs(({ uri }) => ({
  source: { uri },
}))`
  width: 100%;
  height: ${({ theme }) => theme.metrics.getHeightFromDP('30%')}px;
  border-radius: 5px;
`;

const Name = styled(Text).attrs({
  numberOfLines: 2,
})`
  margin-top: ${({ theme }) => theme.metrics.smallSize}px;
  font-size: ${({ theme }) => theme.metrics.largeSize}px;
  font-family: CircularStd-Bold;
  color: ${({ theme }) => theme.colors.textColor};
`;

type Props = {
  getAuthorById: Function,
  profileImage: string,
  name: string,
  id: string,
};

const RelatedAuthorsListItem = ({
  getAuthorById,
  profileImage,
  name,
  id,
}: Props): Object => (
  <Wrapper
    onPress={() => getAuthorById(id)}
  >
    <Image
      uri={profileImage}
    />
    <Name>{name}</Name>
  </Wrapper>
);

const mapDispatchToProps = dispatch => bindActionCreators(AuthorCreators, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(RelatedAuthorsListItem);
