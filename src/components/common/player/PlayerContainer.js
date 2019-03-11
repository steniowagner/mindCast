// @flow

import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';
import { Creators as LocalPodcastsManagerCreators } from '~/store/ducks/localPodcastsManager';

import NextPodcastsList from './components/next-podcasts-list/NextPodcastsList';
import PlayerComponent from './components/PlayerComponent';
import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const Container = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const DarkLayer = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('20%')};
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

type PlayerProps = {
  isCurrentPodcastDownloaded: boolean,
  shouldSeekProgressSlider: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  currentTimeInSeconds: number,
  playlist: Array<Object>,
  playlistIndex: number,
  currentPodcast: Object,
  currentTime: string,
  paused: boolean,
};

type LocalPodcastManagerProps = {
  podcastsDownloaded: Array<Object>,
  downloadingList: Array<Object>,
};

type Props = {
  localPodcastsManager: LocalPodcastManagerProps,
  removeFromPlaylist: Function,
  seekProgressTimer: Function,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  downloadPodcast: Function,
  shufflePlaylist: Function,
  removePodcast: Function,
  playPrevious: Function,
  setupPlayer: Function,
  player: PlayerProps,
  navigation: Object,
  playNext: Function,
  pause: Function,
  play: Function,
};

type State = {
  isQueueSideMenuOpen: boolean,
};

class PlayerContainer extends Component<Props, State> {
  _darkLayerOpacity = new Animated.Value(0);

  state = {
    isQueueSideMenuOpen: false,
  };

  componentDidMount() {
    const { player, setupPlayer, navigation } = this.props;

    const { params } = navigation.state;
    const { playlist: pastPlaylist, currentPodcast, paused } = player;

    const playerParams = params[CONSTANTS.PLAYER_PARAMS];
    const playlist = playerParams[CONSTANTS.PLAYLIST_KEY];

    const isCurrentPodcastDefined = !!currentPodcast;
    const isPodcastChanged = isCurrentPodcastDefined && currentPodcast.id !== playlist[0].id;
    const isPlayingSamePlaylist = this.checkIsPlayingSamePlaylist(
      playlist,
      pastPlaylist,
    );

    this.setHeaderRightMenuPress();

    if (
      !isCurrentPodcastDefined
      || isPodcastChanged
      || !isPlayingSamePlaylist
    ) {
      setupPlayer(playlist);
    }

    this.setHeaderTitle(navigation, playlist[0].subject);
  }

  componentWillUpdate(nextProps: Props) {
    const { navigation, player } = nextProps;
    const { currentPodcast } = player;

    const { currentPodcast: nextPodcast } = nextProps.player;
    const { currentPodcast: pastPodcast } = this.props.player;

    if (pastPodcast && nextPodcast && pastPodcast.id !== nextPodcast.id) {
      this.setHeaderTitle(navigation, nextPodcast.subject);
    }
  }

  onToggleQueueSideMenu = (): void => {
    const { isQueueSideMenuOpen } = this.state;
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.IS_PLAYER_RIGHT_MENU_OPEN]: !isQueueSideMenuOpen,
    });

    this.setDarkLayerOpacity();

    this.setState({
      isQueueSideMenuOpen: !isQueueSideMenuOpen,
    });
  };

  setHeaderTitle = (navigation: Object, subject: string): void => {
    navigation.setParams({
      [CONSTANTS.PLAYER_TITLE_PARAM]: subject,
    });
  };

  setDarkLayerOpacity = (): void => {
    Animated.timing(this._darkLayerOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  setHeaderRightMenuPress = (): void => {
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.HEADER_BUTTON_RIGHT_PLAYER_ACTION]: this.onToggleQueueSideMenu,
    });
  };

  checkIsPlayingSamePlaylist = (
    currentPlaylist: Array<Object>,
    pastPlaylist: Array<Object>,
  ): boolean => {
    if (currentPlaylist.length !== pastPlaylist.length) {
      return false;
    }

    for (let i = 0; i < currentPlaylist.length; i++) {
      if (currentPlaylist[i].id !== pastPlaylist[i].id) {
        return false;
      }
    }

    return true;
  };

  render() {
    const {
      localPodcastsManager,
      removeFromPlaylist,
      disableRepetition,
      seekProgressTimer,
      setRepeatPlaylist,
      setRepeatCurrent,
      downloadPodcast,
      shufflePlaylist,
      removePodcast,
      playPrevious,
      playNext,
      player,
      pause,
      play,
    } = this.props;

    const { isQueueSideMenuOpen } = this.state;
    const { currentPodcast } = player;
    const isPodcastDefined = !!currentPodcast;

    return (
      <Container>
        {isPodcastDefined && (
          <SideMenu
            openMenuOffset={appStyles.metrics.getWidthFromDP('80%')}
            animationFunction={(prop, value) => Animated.timing(prop, {
              toValue: value,
              duration: 250,
            })
            }
            isOpen={isQueueSideMenuOpen}
            bounceBackOnOverdraw
            menu={
              isQueueSideMenuOpen ? (
                <NextPodcastsList
                  shouldRepeatPlaylist={player.shouldRepeatPlaylist}
                  onBackPress={this.onToggleQueueSideMenu}
                  removeFromPlaylist={removeFromPlaylist}
                  playlistIndex={player.playlistIndex}
                  playlist={player.playlist}
                />
              ) : null
            }
            menuPosition="right"
            disableGestures
          >
            <PlayerComponent
              localPodcastsManager={localPodcastsManager}
              disableRepetition={disableRepetition}
              setRepeatPlaylist={setRepeatPlaylist}
              seekProgressTimer={seekProgressTimer}
              setRepeatCurrent={setRepeatCurrent}
              downloadPodcast={downloadPodcast}
              shufflePlaylist={shufflePlaylist}
              removePodcast={removePodcast}
              playPrevious={playPrevious}
              playNext={playNext}
              player={player}
              pause={pause}
              play={play}
            />
          </SideMenu>
        )}
        {isQueueSideMenuOpen && (
          <DarkLayer
            style={{
              opacity: this._darkLayerOpacity,
            }}
          />
        )}
      </Container>
    );
  }
}

const Creators = Object.assign(
  {},
  LocalPodcastsManagerCreators,
  PlayerCreators,
);

const mapDispatchToProps = dispatch => bindActionCreators(Creators, dispatch);

const mapStateToProps = state => ({
  localPodcastsManager: state.localPodcastsManager,
  player: state.player,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerContainer);
