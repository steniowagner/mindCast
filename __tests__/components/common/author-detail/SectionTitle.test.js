import React from 'react';
import { shallow } from 'enzyme';

import SectionTitle from '~/components/common/author-detail/components/SectionTitle';

describe('Testing Common Components - AuthorDetail - SectionTitle', () => {
  it('Renders as expected', () => {
    const title = 'Section Title';

    const wrapper = shallow(<SectionTitle
      title={title}
    />);

    expect(wrapper.children()).toHaveLength(2);
  });
});
