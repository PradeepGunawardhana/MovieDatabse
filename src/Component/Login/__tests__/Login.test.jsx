import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Login from '../Login';

jest.mock('axios');

test('renders login form', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});

test('handles user input correctly', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  act(() => {
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  });

  expect(screen.getByLabelText(/email address/i).value).toBe('test@example.com');
  expect(screen.getByLabelText(/password/i).value).toBe('password123');
});

test('submits the form and navigates on successful login', async () => {
  axios.post.mockResolvedValue({ data: { password: '123' } });

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'pradeep@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  });

  expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/account/get", { email: 'pradeep@example.com' });
});
