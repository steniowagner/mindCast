import React from 'react';
import { shallow } from 'enzyme';

import SubjectsSection from '~/components/common/author-detail/components/SubjectsSection';

describe('Testing Common Components - AuthorDetail - SubjectsSection', () => {
  it('Renders as expected', () => {
    const subjects = ['math', 'science', 'philosofy', 'technology'];

    const wrapper = shallow(<SubjectsSection
      subjects={subjects}
    />);

    expect(wrapper.children()).toHaveLength(1);
  });
});
