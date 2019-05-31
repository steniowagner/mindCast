


# MindCast

![Preview-Screens](https://github.com/steniowagner/mindCast/blob/master/PUXA-R10!.png)

If you want to take a look on all screens of the App, they are [here](https://drive.google.com/drive/folders/1rXFlogxaT5E0pthrrLhF1D_wOVbSHwhD).

## About this Project

The idea of the App is:

_"Share knowledge in the form of podcasts, providing a simple way to learn"._

**PS:** Podcasts was just the context choosed by me for this project, but all the code inside this app can be reused for any app that has audio-streaming as domain, so you can reuse everything here in your next music-player, podcast-library or anything inside this context!

## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/).

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

It's free!

## Some Observations about this App

1 - There's no functionality of Login/Register, the buttons and the forms in the Login Screen are only for UI matters.

2 - The only option that works at _Settings_ screen it's toggle the Dark/Light theme, all the others are just for UI matters too.

## Installers

If you want to test the App in the Production mode, the installers are listed below:

[Android .apk installer](https://drive.google.com/file/d/1LKgdu1WDPo8eU2NVjoB92TPi4my8QP4D/view?usp=sharing)

iOS .ipa installer: Soon!

## Functionalities

- Choose your interests (all, technology, philosfy, science, business, pop-culture or history - it will be used to make requests in order to have a personalized app with what the user want to hear about)

- Get informations about a specific Author, with his New Releases/Featured Podcats and Related Authors

- Get Informations about a specific Podcast, with its description and Author

- Listen and download a single podcasts to listen offline (no need to create a playlist)

- Playlists
	- Create, Edit and Remove your Playlists
	- Download Playlists to listen when the user goes offline
	- Undownload Playlists

- Player to listen the selected podcasts and also be able to: 
	- Shuffle Playlist
	- Repeat Playist
	- Repeat a single Podcast
	- Donwload the current podcast
	- Add the current Podcast to a Playlist
	- Access the queue of next podcasts that will be played
	- Remove podcasts from the queue
	- Play/Pause the current Podcast
	- Next/Previous podcast on the Playlsit

- Bottom Player
	- Access the bottom player out of the Player screen in order to keep tracking the current podcast
	- Get the Author and the Title of the current podcast
	- Play/Pause/Forward the current podcast
	- Track the timer of the current podcast

- Discover
	- A Dashboard with:
	  - Trending Authors
	  - Hottest Podcasts
	  - New Podcasts Released

- Search

	- Search for Authors by name

	- Get information about a certain category, showing it's featured and trending podcats, and the authors that talk about this category

- Library
	- Create Playlists, add podcasts and download it to listen offline

	- Access Your Podcasts (Downloaded + Podcasts saved on your Playlists) in the form of playlist

	- Access your Podcasts downloaded in the form of playlist
	
	- Access recently played podcasts in the form of playlist

	- Change your interests

- Settings

	- Choose between the Dark and Light theme

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a React-Native App, that can be found [here](https://facebook.github.io/react-native/docs/getting-started).

Also, you'll need to the server running locally on your machine with the mock data. You can find the server and all the instructions to start the server [here](https://github.com/steniowagner/mindcast-server).

### Installing

**Cloning the Repository**

```
$ git clone https://github.com/steniowagner/mindCast

$ cd mindCast
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Connecting the App with the Server

1 - Follow the instructions on the [mindcast-server](https://github.com/steniowagner/mindcast-server) to have the server up and running on your machine.

2 - With the server up and running, go to the [/.env.development](https://github.com/steniowagner/mindCast/blob/master/.env.development) file and edit the SERVER_URL value for the IP of your machine (you can have some issues with _localhost_ if you're running on an android physical device, but you can use localhost safely on iOS).

It should looks like this:

SERVER_URL=http://**_IP_OF_YOUR_MACHINE_**:3001/mind-cast/api/v1

*or*

SERVER_URL=http://localhost:3001/mind-cast/api/v1

### Running

With all dependencies installed and the environment properly configured, you can now run the app:

Android

```
$ react-native run-android
```

iOS

```
$ react-native run-ios
```

## Built With

- [React-Native](https://facebook.github.io/react-native/) - Build the native app using JavaScript and React
- [React-Navigation](https://reactnavigation.org/docs/en/getting-started.html) - Router
- [Redux](https://redux.js.org/) - React State Manager
- [Redux-Saga](https://redux-saga.js.org/) - Side-Effect middleware for Redux
- [Axios](https://github.com/axios/axios) - HTTP Client
- [ESlint](https://eslint.org/) - Linter
- [React-Native-Dotenv](https://github.com/zetachang/react-native-dotenv) - Configs from .env file
- [Flow](https://redux-saga.js.org/) - Static Type Checker
- [Prettier](https://prettier.io/) - Code Formatter
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [Reactotron](https://infinite.red/reactotron) - Inspector
- [Styled-Components](https://www.styled-components.com/) - Styles
- [React-Native-Fast-Image](https://github.com/DylanVann/react-native-fast-image) - Image Loader
- [React-Native-Linear-Gradient](https://github.com/react-native-community/react-native-linear-gradient) - Gradient Styles
- [React-Native-SplashScreen](https://github.com/crazycodeboy/react-native-splash-screen) - Splashscreen of the App
- [React-Native-Vector-Icons](https://github.com/oblador/react-native-vector-icons) - Icons
- [React-Native-Side-Menu](https://github.com/react-native-community/react-native-side-menu) - Side Menu used on Player screen
- [React-Native-Swipeout](https://github.com/dancormier/react-native-swipeout) - Swipe for edit/remove playlists and remove podcasts inside some playlist
- [React-Native-Video](https://github.com/react-native-community/react-native-video) - Consume the audio files via streaming
- [React-Native-FS](https://github.com/itinance/react-native-fs) - Handle download/undownload podcasts on file-system


## Support tools

- [Image-Resize](https://imageresize.org) - Resize the Images
- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/steniowagner/mindCast/blob/master/LICENSE) file for details
