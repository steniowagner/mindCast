// @flow

import React, { Component } from 'react';
import { Animated } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as SubjectCreators } from '~/store/ducks/subject';

import SubjectDetailComponent from './components/SubjectDetailComponent';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

type SubjectProps = {
  loading: boolean,
  error: boolean,
  data: Object,
};

type Props = {
  getSubjectDetail: Function,
  subject: SubjectProps,
  navigation: Object,
};

const HEADER_HEIGHT = appStyles.metrics.getHeightFromDP('20%');

class SubjectDetailContainer extends Component<Props, {}> {
  componentDidMount() {
    const { getSubjectDetail, navigation } = this.props;

    const { params } = navigation.state;
    const { id } = params[CONSTANTS.PARAMS.SUBJECT_DETAIL];

    getSubjectDetail(id);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { subject, navigation } = nextProps;

    if (subject.error && !this.props.subject.error) {
      navigation.setParams({ [CONSTANTS.PARAMS.HAS_ERROR]: true });
    }
  }

  render() {
    const { subject, navigation } = this.props;
    const { loading, error, data } = subject;

    return (
      <SubjectDetailComponent
        navigation={navigation}
        loading={loading}
        subject={subject}
        error={error}
      />
    );
  }
}

const mapStateToProps = state => ({
  subject: state.subject,
});

const mapDispatchToProps = dispatch => bindActionCreators(SubjectCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubjectDetailContainer);
