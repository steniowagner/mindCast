import React from 'react';
import { shallow } from 'enzyme';

import ProgressiveImage from '~/components/common/ProgressiveImage';

describe('Testing Common Components - ProgressiveImage', () => {
  it('Renders as expected', () => {
    const thumbnailImageURL = 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg';
    const imageURL = 'https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe.jpeg';

    const wrapper = shallow(
      <ProgressiveImage
        thumbnailImageURL={thumbnailImageURL}
        imageURL={imageURL}
      />,
    );

    expect(wrapper.instance().props.imageURL).toEqual(imageURL);
    expect(wrapper.instance().props.thumbnailImageURL).toEqual(
      thumbnailImageURL,
    );

    expect(wrapper.children()).toHaveLength(2);
  });
});
