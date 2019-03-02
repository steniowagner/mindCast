import React from 'react';
import { shallow } from 'enzyme';

import AboutSection from '~/components/common/author-detail/components/AboutSection';

describe('Testing Common Components - AuthorDetail - AboutSection', () => {
  it('Renders as expected', () => {
    const title = 'Section Title';

    const wrapper = shallow(<AboutSection
      title={title}
    />);

    expect(wrapper.children()).toHaveLength(2);
  });
});
