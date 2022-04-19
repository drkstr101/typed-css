import { render } from '@testing-library/react';
import features from './features';

import HomepageFeatures from './homepage-features';

describe('HomepageFeatures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomepageFeatures items={features} />);
    expect(baseElement).toBeTruthy();
  });
});
