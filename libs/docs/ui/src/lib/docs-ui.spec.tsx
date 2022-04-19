import { render } from '@testing-library/react';

import DocsUi from './docs-ui';

describe('DocsUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DocsUi />);
    expect(baseElement).toBeTruthy();
  });
});
