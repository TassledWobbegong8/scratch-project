import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();
import React from 'react';
import { BrowserRouter, Link, Outlet, Routes, Route, useRoutes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { server } from './mocks/server'

import regeneratorRuntime from 'regenerator-runtime';
import renderer from 'react-test-renderer';

import App from '../client/components/App';
import Dashboard from '../client/containers/Dashboard';
import Profile from '../client/containers/Profile';
import Room from '../client/containers/Room';
import RoomContainer from '../client/containers/Dashboard';
import MainNav from '../client/components/MainNav';
// require('jest-fetch-mock').enableMocks();

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

        test('Just let me pass the basic test', ()=> {
        //   const linkElement = screen.getByText('Home');
        //   expect(linkElement).toBeInTheDocument();
            expect(mainNav.getByText('Home')).toBeInTheDocument();
        })

   })
})