import { render, screen } from '@testing-library/react';
import App from 'App';

test('renders title', () => {
  render(<App />);
  const titleElement = screen.getByText(/21BDS0268/i);
  expect(titleElement).toBeInTheDocument();
});

test('fetches GET response', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ operation_code: 1 }),
    })
  );

  render(<App />);
  const getButton = screen.getByText(/click for get endpoint/i);
  getButton.click();

  const getResponseElement = await screen.findByText(/operation code: 1/i);
  expect(getResponseElement).toBeInTheDocument();
});
