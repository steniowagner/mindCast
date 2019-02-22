import React from 'react';
import { shallow } from 'enzyme';

import BackgroundImage from '~/components/screens/player/components/BackgroundImage';

describe('Testing Screens - Player - BackgroundImage', () => {
  it('Renders as expected when has props', () => {
    const wrapper = shallow(
      <BackgroundImage
        imageURL="https://s3-sa-east-1.amazonaws.com/mind-cast/images/universe-thumbnail.jpeg"
      />,
    );

    expect(wrapper.children()).toHaveLength(2);
  });

  it('Renders as expected when imageURL prop is blank', () => {
    const wrapper = shallow(<BackgroundImage
      imageURL=""
    />);

    expect(wrapper.children()).toHaveLength(1);
  });

  it('Renders as expected when imageURL prop is undefined', () => {
    const wrapper = shallow(<BackgroundImage />);

    expect(wrapper.children()).toHaveLength(1);
  });
});
