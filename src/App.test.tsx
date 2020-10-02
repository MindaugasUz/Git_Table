import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./components/Table/GitTable', () => () => <div data-testid="git-table"></div>)

describe('<App/>', ()=> {
  test('renders GitTable component', () => {
    const { getByTestId } = render(<App />);
    
    expect(getByTestId(/git-table/)).toBeInTheDocument();
  });
})

