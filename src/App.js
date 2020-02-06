import React from 'react';
import './App.css';
import Field from './field_view/Field'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import Navigation from './components/Header'
import { Route, Switch, Redirect } from 'react-router-dom'
import { fetchFields } from './redux_files/actions'
import Profile from './profile/Profile'
import TestComponent from './TestComponent'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchFields()
  }

  render() {
    return <div className="App">
        <Navigation />
          <div className='bg-img'>
            <Switch>
              <Route path='/test' component={TestComponent} />
              <Route path='/login'>
                Login Component goes here
              </Route>
              <Route path='/signup'>
                Signup Component goes here
              </Route>
              <Route path='/profile'>
                <Profile />
              </Route>
              <Route path='/field/:slug'>
                <Field />
              </Route>
              <Route exact path='/'>
                <Redirect to='/profile' />
              </Route>
              <Route exact path='/github' component={() => window.location = 'https://github.com/mattbechtel1/succotash-frontend'} />
            </Switch>
        </div>
        <Footer />
    </div>
  }
}

export default connect(null, {fetchFields})(App);