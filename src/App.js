import React from 'react';
import './App.css';
import FieldDisplay from './containers/FieldDisplay'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import Navigation from './components/Header'
import { Route, Switch } from 'react-router-dom'
import { fetchFields } from './redux_files/actions'
import Profile from './profile/Profile'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchFields()
  }

  render() {
    return <div className="App">
        <Navigation />
        {/* <div style={{ backgroundImage:`url(${scenic_field})` }}> */}
        <div className='background-field'>
          <Switch>
            <Route path='/login'>
              Login Component goes here
            </Route>
            <Route path='/signup'>
              Signup Component goes here
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/field'>
              <FieldDisplay />
            </Route>
            <Route exact path='/'>
              Homepage goes here
            </Route>
          </Switch>
        </div>
        <Footer />
    </div>
  }
}

export default connect(null, {fetchFields})(App);