import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './redux_files/reducer'
import {BrowserRouter as Router} from 'react-router-dom'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CssBaseline />
                <App />
            </MuiPickersUtilsProvider>
        </Provider>
    </Router>
    , document.getElementById('root'));