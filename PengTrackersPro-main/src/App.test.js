import { render, screen } from '@testing-library/react';
import App from './App';

// Define a test case to check if the "learn react" link is rendered
test('renders learn react link', () => {
  // Render the App component
  render(<App />);
  // Search for an element that contains the text "learn react" (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);
  // Assert that the found element is present in the document
  expect(linkElement).toBeInTheDocument();
});
