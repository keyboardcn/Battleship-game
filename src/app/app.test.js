import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';
import BattleshipUI from './components/battleship.ui';
// import '@testing-library/jest-dom'; // Ensure this import is present

jest.mock('./components/battleship.ui', () => {
  return jest.fn(() => <div data-testid="battleship-ui-mock">Battleship UI Mock</div>);
});

describe('App Component', () => {
  it('should render the BattleshipUI component', () => {
    render(<App />);

    const battleshipUIMockElement = screen.getByTestId('battleship-ui-mock');
    expect(battleshipUIMockElement).toBeInTheDocument();

    expect(BattleshipUI).toHaveBeenCalledTimes(1);
  });
});