import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles/';

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {BreakpointProvider } from 'react-socks'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './redux_files/reducer'

import HttpsRedirect from 'react-https-redirect'

import App from './App';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const theme = createTheme({
    palette: {
        primary: {
            light: '#ffffa8',
            main: '#fff176',
            dark: '#cabf45',
            contrastText: '#000'

        },
        secondary: {
            light: '#b1f9b3',
            dark: '#509556',
            main: '#80c683',
            contrastText: '#000'
        },
        warning: {
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff'
        }
    }
})

ReactDOM.render(
    <HttpsRedirect>
        <Router>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <BreakpointProvider>
                            <CssBaseline />
                            <App />
                        </BreakpointProvider>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </Provider>
        </Router>
    </HttpsRedirect>
    , document.getElementById('root'));