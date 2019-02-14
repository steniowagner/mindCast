import RNFS from 'react-native-fs';

const BASE_OUTPUT_DIRECTORY = '../../assets/podcasts/index.js';

const generatePodcastsToImportFile = async () => {
  try {
    const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    const filteredFiles = files.filter(
      file => file.isFile() && file.path.includes('mp3'),
    );

    const content = `{\n${filteredFiles.map(
      file => `"${file.name.split('.')[0]}": require("./${file.path}"),`,
    )}}`;

    // const outPut = `export default ${content}`;
    console.tron.log();

    const isOutputDirectoryAlreadyCreated = await RNFS.exists(
      BASE_OUTPUT_DIRECTORY,
    );

    try {
      if (isOutputDirectoryAlreadyCreated) {
        // await RNFS.writeFile(BASE_OUTPUT_DIRECTORY, outPut, 'utf8');
      } else {
        // await RNFS.writeFile(BASE_OUTPUT_DIRECTORY, outPut, 'utf8');
      }
    } catch (err) {
      console.tron.log('err2');
      console.tron.log(err);
    }
  } catch (err) {
    console.tron.log('err');
    console.tron.log(err);
  }
};

export default generatePodcastsToImportFile;
