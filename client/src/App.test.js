import { render, screen } from '@testing-library/react';
import App from './App';
import SignUpForm from './components/SignUpForm';

test('renders learn react link', () => {
  render(<SignUpForm />);
  const linkElement = screen.getByRole('option');
  expect(linkElement).toBeInTheDocument();
});
