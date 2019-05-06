// @flow

import React, { Component } from 'react';

import InterestsComponent from '~/components/common/interests/Interests';
import CONSTANTS from '~/utils/CONSTANTS';

type Props = {
  navigation: Object,
};

class Interests extends Component<Props, {}> {
  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.PARAMS.HEADER_ACTION]: () => navigation.navigate(CONSTANTS.ROUTES.MAIN_STACK),
    });
  }

  render() {
    return <InterestsComponent />;
  }
}

export default Interests;
