import React from 'react';
import { shallow } from 'enzyme';

import PodcastImage from '~/components/screens/player/components/PodcastImage';

describe('Testing Screens - Player - PodcastImage', () => {
  it('Renders as expected', () => {
    const thumbnailImageURL = 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg';
    const imageURL = 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe.jpeg';

    const wrapper = shallow(
      <PodcastImage
        thumbnailImageURL={thumbnailImageURL}
        imageURL={imageURL}
      />,
    );

    expect(wrapper.children()).toHaveLength(1);
  });
});
