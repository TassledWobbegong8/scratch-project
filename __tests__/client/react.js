/**
 * @jest-environment jsdom
 */

import React from 'React'
import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useNavigate, BrowserRouter } from 'react-router-dom';

import Login from '../../client/components/Login'

// import App from '../../client/components/App'
// import '../../client/stylesheets/main.scss'
// import Dashboard from '../../client/containers/Dashboard'

const mockUseNavigate = jest.fn(); // mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Unit testing React components', () => {
  describe('Login', () => {
    let form;
    beforeEach(() => {
      form = render(<Login />, {wrapper: BrowserRouter});
    });
    it('renders the login page by default', () => {
      expect(screen.getByText('Login Details')).toBeInTheDocument();
    });
    it('initially loads and displays a login form with username field', () => {
      expect(form.getByLabelText('Username')).toBeTruthy();
    });
    it('contains a button for submitting login info', () => {
      expect(form.getByRole('button', { name: 'auth-btn'})).toBeTruthy();
    });
    
    it('routes to Signup if user does not have an account', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByText('Click here!'));
      expect(screen.getByText('Signup Details')).toBeInTheDocument();
    });
  });
});