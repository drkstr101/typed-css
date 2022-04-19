import { render } from '@testing-library/react';

import HomepageFeatures from './homepage-features';

describe('HomepageFeatures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomepageFeatures />);
    expect(baseElement).toBeTruthy();
  });
});
