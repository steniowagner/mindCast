import React from 'react';
import { shallow } from 'enzyme';

import PlayerControls from '~/components/screens/player/components/PlayerControls';

describe('Testing Screens - Player - PlayerControls', () => {
  it('Renders as expected', () => {
    const wrapper = shallow(<PlayerControls />);
  });
});
