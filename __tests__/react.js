
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Outlet, Routes, Route, useRoutes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
// import { server } from './mocks/server'

import regeneratorRuntime from 'regenerator-runtime';
import renderer from 'react-test-renderer';

import App from '../client/components/App';
import Dashboard from '../client/containers/Dashboard';
import Profile from '../client/containers/Profile';
import Room from '../client/containers/Room';
import RoomContainer from '../client/containers/Dashboard';
import MainNav from '../client/components/MainNav';
import SubjectNav from '../client/components/SubjectNav';

// import mongoose from 'mongoose';

describe('Unit testing React componnets', () => {
    describe('Dashboard', () => {
    //     // beforeEach(() => {
    //     //     jest.spyOn(global, 'fetch').mockResolvedValue(
    //     //       console.log(jest.fn().mockResolvedValue(mockResponse))
    //     //       // {logged: jest.fn().mockResolvedValue(mockResponse)}
    //     //     )
    //     //   });
    //     // beforeEach(() => {
    //     //     fetch.mockResponse(JSON.stringify({ logged: false }));
    //     // })

    //     afterEach(() => {
    //         jest.restoreAllMocks();
    //       });

    //     beforeAll(() => {
    //         render(<App/>, {wrapper: BrowserRouter});
    //         fetch.mockResponse(JSON.stringify({ logged: false }))
    //     });
        let app;
        beforeAll(() => app = render(<App/>, { wrapper: BrowserRouter }))
        // beforeAll(() => app.render(<Dashboard/>));

        test('Renders a dashboard with login component', () => {
            // const loginHeader = document.querySelector('#login-text')
            const loginHeader = screen.getByText('Login Details');
            expect(loginHeader).toBeInTheDocument();
        });
    })

    describe('Main Nav', () => {
      let mainNav;

      beforeEach(() => {
        mainNav = render(<MainNav/>, {wrapper: BrowserRouter})
      })

        test('Checking for main nav child components', ()=> {
        //   const linkElement = screen.getByText('Home');
        //   expect(linkElement).toBeInTheDocument();
            expect(mainNav.getByText('Home')).toBeInTheDocument();
            expect(mainNav.getByText('Profile')).toBeInTheDocument();
            expect(mainNav.getByText('Settings')).toBeInTheDocument();
            expect(mainNav.getByText('Logout')).toBeInTheDocument();
        })

   });

   describe('Subject Nav', () => {
    let subjectNav;
    let user;
    let room;
    let handleClick;
    let subject = '';

    beforeEach(() => {
      user = userEvent.setup();
      handleClick = jest.fn((e) => {
        subject = e
      })
      // room = render(<Dashboard/>, {wrapper: BrowserRouter})
      subjectNav = render(<SubjectNav setSubject={handleClick}/>, {wrapper: BrowserRouter});


    })

    test('Checking for subject nav child components', () => {
      //test for subject buttons
      const math = subjectNav.getByRole('button', { name: 'math'});
      expect(math).toBeInTheDocument();
      const english = subjectNav.getByRole('button', { name: 'english'});
      expect(english).toBeInTheDocument();
      const history = subjectNav.getByRole('button', { name: 'history'});
      expect(history).toBeInTheDocument();
      const science = subjectNav.getByRole('button', { name: 'science'});
      expect(science).toBeInTheDocument();
    });

    test('Clicking on the links should redirect the user to the correct endpoint' , async () => {
      const math = subjectNav.getByRole('button', { name: 'math'});
      expect(math).toBeInTheDocument();

      await userEvent.click(math);
      // userEvent.click(math);
      // Matt's suspicion: async await
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(subject).toBe('math');
    });
   });
})