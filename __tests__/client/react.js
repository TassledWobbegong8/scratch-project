/**
 * @jest-environment jsdom
 */


import React from 'React'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/react'
import '@testing-library/jest-dom'
import { useNavigate } from 'react-router-dom';

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
    beforeAll(() => {
      form = render(<Login />);
    });

    test('loads and displays a form with username field', () => {
      expect(form.getByLabelText('Username')).toBeTruthy();

    });
  });
})