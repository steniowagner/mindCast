import React from 'react';
import { shallow } from 'enzyme';

import AuthorName from '~/components/common/author-detail/components/AuthorName';

describe('Testing Common Components - AuthorDetail - AuthorName', () => {
  it('Renders as expected', () => {
    const authorName = 'Alan Turing';

    const wrapper = shallow(<AuthorName
      name={authorName}
    />);

    expect(wrapper.children()).toHaveLength(1);
  });
});
