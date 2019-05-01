// @flow

import React, { Component, Fragment } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  Platform,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components';

import {
  getItemFromStorage,
  persistItemInStorage,
} from '~/utils/AsyncStorageManager';
import ThemeContextConsumer from '~/ThemeContextProvider';
import ScreenTitle from '~/components/common/ScreenTitle';
import Switch from '~/components/common/Switch';
import Icon from '~/components/common/Icon';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Wrapper = styled(ScrollView).attrs({
  alwaysBounceVertical: false,
})`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryColor};
`;

const OptionsWrapper = styled(View)`
  width: 100%;
  margin-top: ${({ theme }) => theme.metrics.extraLargeSize}px;
  padding-horizontal: ${({ theme }) => theme.metrics.largeSize}px;
`;

const Row = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled(View)`
  width: 75%;
  margin-bottom: ${({ theme }) => theme.metrics.extraLargeSize * 1.5}px;
`;

const OptiontTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.metrics.extraSmallSize}px;
  font-family: CircularStd-Bold;
  font-size: ${({ theme }) => theme.metrics.largeSize * 1.1}px;
  color: ${({ theme }) => theme.colors.textColor};
`;

const OptionDescription = styled(Text)`
  font-family: CircularStd-Medium;
  font-size: ${({ theme }) => theme.metrics.mediumSize * 1.3}px;
  color: ${({ theme }) => theme.colors.subTextColor};
`;

const DARK_THEME_STATE_REF = 'DARK_THEME_STATE_REF';

const STORAGE_KEYS = {
  DOWNLOAD_MOBILE_DATA: 'DOWNLOAD_MOBILE_DATA',
  OFFLINE_MODE: 'OFFLINE_MODE',
  AUTO_PLAY: 'AUTO_PLAY',
};

const items = [
  {
    title: 'AutoPlay',
    description:
      'Continue listening to similar podcasts when the current playlist ends.',
    stateReference: 'isAutoPlayOn',
    storageKey: STORAGE_KEYS.AUTO_PLAY,
  },
  {
    title: 'Offline mode',
    description:
      'When you goes offline, only will be possible to listen podcasts previously downloaded.',
    stateReference: 'isOfflineModeOn',
    storageKey: STORAGE_KEYS.OFFLINE_MODE,
  },
  {
    title: 'Dark Theme',
    description:
      'Activate the Dark theme (the Light Theme will be activated otherwise).',
    stateReference: DARK_THEME_STATE_REF,
  },
  {
    title: 'Download with Mobile Network',
    description:
      "Allows the App to performs downloads by using the device's network.",
    stateReference: 'shouldDownloadMobileData',
    storageKey: STORAGE_KEYS.DOWNLOAD_MOBILE_DATA,
  },
];

type Props = {
  LOCAL_STACK_ROUTES: Object,
  navigation: Object,
};

type State = {
  shouldDownloadMobileData: boolean,
  isOfflineModeOn: boolean,
  isAutoPlayOn: boolean,
};

class Settings extends Component<Props, State> {
  state = {
    shouldDownloadMobileData: false,
    isOfflineModeOn: false,
    isAutoPlayOn: false,
  };

  async componentDidMount() {
    const [
      shouldDownloadMobileData,
      isOfflineModeOn,
      isAutoPlayOn,
    ] = await Promise.all([
      getItemFromStorage(STORAGE_KEYS.DOWNLOAD_MOBILE_DATA, false),
      getItemFromStorage(STORAGE_KEYS.OFFLINE_MODE, false),
      getItemFromStorage(STORAGE_KEYS.AUTO_PLAY, false),
    ]);

    this.setState({
      shouldDownloadMobileData: shouldDownloadMobileData === 'true',
      isOfflineModeOn: isOfflineModeOn === 'true',
      isAutoPlayOn: isAutoPlayOn === 'true',
    });
  }

  onToggleSwitch = async (stateReference: string, storageKey: string): void => {
    const currentOptionValue = this.state[stateReference];

    this.setState({
      [stateReference]: !currentOptionValue,
    });

    await persistItemInStorage(storageKey, !currentOptionValue);
  };

  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <ScreenTitle
          title="Settings"
        />
        <ThemeContextConsumer>
          {(context) => {
            const { onToggleDarkTheme, isDarkThemeActivated } = context;

            return (
              <OptionsWrapper>
                {items.map((item) => {
                  const value = item.stateReference !== DARK_THEME_STATE_REF
                    ? this.state[item.stateReference]
                    : isDarkThemeActivated;

                  return (
                    <Row
                      key={item.title}
                    >
                      <TextWrapper>
                        <OptiontTitle>{item.title}</OptiontTitle>
                        <OptionDescription>
                          {item.description}
                        </OptionDescription>
                      </TextWrapper>
                      <Switch
                        onToggle={() => {
                          const onToggle = item.stateReference === DARK_THEME_STATE_REF
                            ? onToggleDarkTheme
                            : () => this.onToggleSwitch(
                              item.stateReference,
                              item.storageKey,
                            );

                          onToggle();
                        }}
                        value={value}
                      />
                    </Row>
                  );
                })}
                <TouchableOpacity
                  onPress={() => {
                    const { LOCAL_STACK_ROUTES } = this.props;
                    navigation.navigate(LOCAL_STACK_ROUTES.ABOUT);
                  }}
                  hitSlop={{
                    bottom: appStyles.metrics.smallSize,
                    right: appStyles.metrics.smallSize,
                    left: appStyles.metrics.smallSize,
                    top: appStyles.metrics.smallSize,
                  }}
                >
                  <Row>
                    <TextWrapper>
                      <OptiontTitle>About</OptiontTitle>
                      <OptionDescription>
                        Want to know more about the Creator of this App? Check
                        it out!
                      </OptionDescription>
                    </TextWrapper>
                    <Icon
                      color={appStyles.colors.subTextWhite}
                      name={
                        Platform.OS === 'android'
                          ? 'arrow-right'
                          : 'chevron-right'
                      }
                      size={Platform.OS === 'android' ? 32 : 34}
                    />
                  </Row>
                </TouchableOpacity>
              </OptionsWrapper>
            );
          }}
        </ThemeContextConsumer>
      </Wrapper>
    );
  }
}

export default Settings;
