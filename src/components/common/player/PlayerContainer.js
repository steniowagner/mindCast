// @flow

import React, { Component, Fragment } from 'react';
import { Animated, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as PlayerCreators } from '~/store/ducks/player';

import PlaylistList from '~/components/common/playlists-list/PlaylistsListContainer';
import NextPodcastsList from './components/next-podcasts-list/NextPodcastsList';
import PlayerComponent from './components/PlayerComponent';

import CONSTANTS from '~/utils/CONSTANTS';
import appStyles from '~/styles';

const DarkLayer = styled(Animated.View)`
  width: ${({ theme }) => theme.metrics.getWidthFromDP('15%')};
  height: 100%;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.darkLayer};
`;

type Props = {
  isCurrentPodcastDownloaded: boolean,
  onToggleAddPlaylistModal: Function,
  isAddPlaylistModalOpen: boolean,
  isAddPlaylistModalOpen: boolean,
  shouldShufflePlaylist: boolean,
  shouldRepeatPlaylist: boolean,
  shouldRepeatCurrent: boolean,
  setupShufflePlayer: Function,
  removeFromPlaylist: Function,
  seekProgressTimer: Function,
  disableRepetition: Function,
  setRepeatPlaylist: Function,
  setRepeatCurrent: Function,
  shufflePlaylist: Function,
  playlist: Array<Object>,
  currentPodcast: Object,
  playPrevious: Function,
  playlistIndex: number,
  setupPlayer: Function,
  navigation: Object,
  playNext: Function,
  pause: Function,
  paused: boolean,
  play: Function,
};

type State = {
  isAddPlaylistModalOpen: boolean,
  isQueueSideMenuOpen: boolean,
};

class Player extends Component<Props, State> {
  _darkLayerOpacity = new Animated.Value(0);

  state = {
    isAddPlaylistModalOpen: false,
    isQueueSideMenuOpen: false,
  };

  componentDidMount() {
    const { navigation, playlist, playlistIndex } = this.props;
    const { params } = navigation.state;

    const playerParams = params[CONSTANTS.PARAMS.PLAYER];
    const isLookingUpPlayer = playerParams[CONSTANTS.KEYS.LOOKUP_PLAYER];

    this.setHeaderRightMenuPress();

    if (isLookingUpPlayer) {
      this.setHeaderTitle(playlist[playlistIndex].category);

      return;
    }

    this.handlePlayerConfiguration(playerParams);
  }

  componentWillUpdate(nextProps: Props) {
    const nextPodcast = nextProps.currentPodcast;
    const pastPodcast = this.props.currentPodcast;

    if (pastPodcast && nextPodcast && pastPodcast.id !== nextPodcast.id) {
      this.setHeaderTitle(nextPodcast.category);
    }
  }

  onToggleAddPlaylistModal = (): void => {
    const { isAddPlaylistModalOpen } = this.state;

    this.setState({
      isAddPlaylistModalOpen: !isAddPlaylistModalOpen,
    });
  };

  onToggleQueueSideMenu = (): void => {
    const { isQueueSideMenuOpen } = this.state;
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.KEYS.IS_PLAYER_RIGHT_MENU_OPEN]: !isQueueSideMenuOpen,
    });

    this.setDarkLayerOpacity();

    this.setState({
      isQueueSideMenuOpen: !isQueueSideMenuOpen,
    });
  };

  setHeaderTitle = (subject: string): void => {
    const { navigation } = this.props;

    navigation.setParams({
      [CONSTANTS.PARAMS.PLAYER_TITLE]: subject,
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
      [CONSTANTS.PARAMS.HEADER_BUTTON_RIGHT_PLAYER_ACTION]: this
        .onToggleQueueSideMenu,
    });
  };

  handlePlayerConfiguration = (playerParams: Object): void => {
    const {
      playlist: pastPlaylist,
      currentPodcast,
      playlistIndex,
      paused,
    } = this.props;

    const shouldShufflePlaylist = playerParams[CONSTANTS.KEYS.SHOULD_SHUFFLE_PLAYLIST];
    const playlist = playerParams[CONSTANTS.KEYS.PLAYLIST];

    const isCurrentPodcastDefined = !!currentPodcast;
    const isPodcastChanged = isCurrentPodcastDefined && currentPodcast.id !== playlist[0].id;
    const isPlayingSamePlaylist = this.checkIsPlayingSamePlaylist(
      playlist,
      pastPlaylist,
    );

    if (
      !isCurrentPodcastDefined
      || isPodcastChanged
      || !isPlayingSamePlaylist
      || shouldShufflePlaylist
    ) {
      const { setupShufflePlayer, setupPlayer } = this.props;

      const properAction = shouldShufflePlaylist
        ? setupShufflePlayer
        : setupPlayer;

      properAction(playlist);
    }

    this.setHeaderTitle(playlist[0].category);
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
      isCurrentPodcastDownloaded,
      shouldShufflePlaylist,
      shouldRepeatPlaylist,
      shouldRepeatCurrent,
      removeFromPlaylist,
      disableRepetition,
      seekProgressTimer,
      setRepeatPlaylist,
      setRepeatCurrent,
      shufflePlaylist,
      currentPodcast,
      playlistIndex,
      playPrevious,
      playlist,
      playNext,
      paused,
      pause,
      play,
    } = this.props;

    const { isAddPlaylistModalOpen, isQueueSideMenuOpen } = this.state;

    return (
      <Fragment>
        {!!currentPodcast && (
          <SideMenu
            animationFunction={(prop, value) => Animated.timing(prop, {
              toValue: value,
              duration: 250,
            })
            }
            menu={
              isQueueSideMenuOpen ? (
                <NextPodcastsList
                  shouldRepeatPlaylist={shouldRepeatPlaylist}
                  onBackPress={this.onToggleQueueSideMenu}
                  removeFromPlaylist={removeFromPlaylist}
                  playlistIndex={playlistIndex}
                  playlist={playlist}
                />
              ) : null
            }
            openMenuOffset={appStyles.metrics.getWidthFromDP('85%')}
            isOpen={isQueueSideMenuOpen}
            bounceBackOnOverdraw
            menuPosition="right"
            disableGestures
          >
            <PlayerComponent
              onToggleAddPlaylistModal={this.onToggleAddPlaylistModal}
              isCurrentPodcastDownloaded={isCurrentPodcastDownloaded}
              isAddPlaylistModalOpen={isAddPlaylistModalOpen}
              shouldShufflePlaylist={shouldShufflePlaylist}
              shouldRepeatPlaylist={shouldRepeatPlaylist}
              shouldRepeatCurrent={shouldRepeatCurrent}
              disableRepetition={disableRepetition}
              setRepeatPlaylist={setRepeatPlaylist}
              seekProgressTimer={seekProgressTimer}
              setRepeatCurrent={setRepeatCurrent}
              shufflePlaylist={shufflePlaylist}
              currentPodcast={currentPodcast}
              playlistIndex={playlistIndex}
              playPrevious={playPrevious}
              playNext={playNext}
              playlist={playlist}
              paused={paused}
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
        {isAddPlaylistModalOpen && (
          <PlaylistList
            onToggleModal={this.onToggleAddPlaylistModal}
            podcast={currentPodcast}
          />
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(PlayerCreators, dispatch);

const mapStateToProps = state => ({
  isCurrentPodcastDownloaded: state.player.isCurrentPodcastDownloaded,
  shouldShufflePlaylist: state.player.shouldShufflePlaylist,
  shouldRepeatPlaylist: state.player.shouldRepeatPlaylist,
  shouldRepeatCurrent: state.player.shouldRepeatCurrent,
  currentPodcast: state.player.currentPodcast,
  playlistIndex: state.player.playlistIndex,
  playlist: state.player.playlist,
  paused: state.player.paused,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Player);
