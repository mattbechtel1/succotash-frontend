import React from 'react';
import './App.css';
import Field from './field_view/Field'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import Navigation from './components/Header'
import { Route, Switch, Redirect } from 'react-router-dom'
import { fetchFields, saveNewUser } from './redux_files/actions'
import Profile from './profile/Profile'
import TestComponent from './TestComponent'
import Login from './components/Login'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchFields()
  }

  render() {
    const {user, saveNewUser} = this.props
    // debugger
    return <div className="App">
        <Navigation />
          <div className='bg-img'>
            <Switch>
              <Route path='/test' component={TestComponent} />
              <Route path='/login'>
                { user ? 'You are already logged in' : <Login submitAction={null} displayText='Log in' />}
              </Route>
              <Route path='/signup'>
                { user ? <Redirect to='/profile' /> : <Login submitAction={saveNewUser} displayText='Sign up'/> }
              </Route>
              <Route path='/profile'>
                { user ? <Profile /> : <Redirect to='/login' /> }
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

export default connect(({user}) => ({user}), {fetchFields, saveNewUser})(App);