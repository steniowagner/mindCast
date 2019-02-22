import React from 'react';
import { shallow } from 'enzyme';

import Icon from '~/components/common/Icon';

describe('Testing Common Components - Icon', () => {
  it('Renders as expected', () => {
    const wrapper = shallow(<Icon
      name="cloud-download"
      size={22}
    />);

    expect(wrapper.props().name).toEqual('cloud-download');
    expect(wrapper.props().size).toEqual(22);
    expect(wrapper.children()).toHaveLength(0);
  });
});
