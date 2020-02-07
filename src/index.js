import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import { ThemeProvider } from '@material-ui/styles/';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './redux_files/reducer'
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

const theme = createMuiTheme({
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
            contrastText: '#fff'
        }
    }
})

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <CssBaseline />
                    <App />
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </Provider>
    </Router>
    , document.getElementById('root'));