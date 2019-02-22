import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Button from '~/components/screens/player/components/bottom-player-options/components/Button';
import Icon from '~/components/common/Icon';

describe('Testing Screens - Player - BottomPlayerOptions/Button', () => {
  it('Renders as expected when has no children', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.children()).toHaveLength(0);
  });

  it('Can perform action when pressed and has no children', () => {
    const onPressSpy = sinon.spy();

    const wrapper = shallow(<Button
      onPress={onPressSpy}
    />);

    expect(wrapper.props().onPress).toEqual(onPressSpy);

    wrapper.simulate('press');

    expect(onPressSpy.calledOnce).toBe(true);
  });

  it('Renders as expected when has children', () => {
    const wrapper = shallow(
      <Button>
        <Icon
          name="cloud-download"
          size={22}
        />
      </Button>,
    );

    expect(wrapper.children()).toHaveLength(1);

    expect(wrapper.contains(<Icon
      name="cloud-download"
      size={22}
    />)).toEqual(
      true,
    );
  });

  it('Can perform action when pressed and has children', () => {
    const onPressSpy = sinon.spy();

    const wrapper = shallow(
      <Button
        onPress={onPressSpy}
      >
        <Icon
          name="cloud-download"
          size={22}
        />
      </Button>,
    );

    expect(wrapper.props().onPress).toEqual(onPressSpy);

    wrapper.simulate('press');

    expect(onPressSpy.calledOnce).toBe(true);

    expect(wrapper.contains(<Icon
      name="cloud-download"
      size={22}
    />)).toEqual(
      true,
    );
  });
});
