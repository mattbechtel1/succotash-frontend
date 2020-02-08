import React from 'react';
import './App.css';
import Field from './field_view/Field'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import Navigation from './components/Header'
import { Route, Switch, Redirect } from 'react-router-dom'
import { saveNewUser, setUser, loginUser, loadPage, pageLoaded } from './redux_files/actions'
import Profile from './profile_view/Profile'
import TestComponent from './TestComponent'
import NewFieldForm from './components/NewFieldForm'
import { Card } from '@material-ui/core'
import Login from './components/Login'
import Logout from './components/Logout'
import {CircularProgress} from '@material-ui/core'
import Home from './home_view/Home'

class App extends React.Component {
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.loadPage()
      fetch('https://succotash-app-api.herokuapp.com/api/v1/profile', {
        method: 'GET',
        headers: {'Authorization': token }
      })
      .then(response => response.json())
      .then(user => {
        if (!user.error) {
          this.props.setUser(user)
          this.props.pageLoaded()
        }
      })
    }
  }

  render() {
    const {user, loading} = this.props
    
    return <div className="App">
        <Navigation className='top-bottom-bg' />
          <div className='bg-img'>
            {loading ?
                <CircularProgress color='primary' thickness={3} />
              :
            <Switch>
              <Route path='/test' component={TestComponent} />
              <Route path='/login'>
                { user ? <Redirect to='/profile' /> : <Login submitAction={loginUser} displayText='Log in' />}
              </Route>
              <Route path='/signup'>
                { user ? <Redirect to='/profile' /> : <Login submitAction={saveNewUser} displayText='Sign up'/> }
              </Route>
              <Route path='/profile'>
                { user ? <Profile /> : <Redirect to='/login' /> }
              </Route>
              <Route exact path='/field/new'>
                { !user ? <Redirect to='/' /> :
                  <div style={{display: 'inline-block'}}>
                    <Card style={{marginTop: '10px'}}>
                      <NewFieldForm />
                    </Card>
                  </div>
                }
              </Route>
              <Route path='/field/:slug'>
                <Field />
              </Route>
              <Route exact path='/logout'>
                <Logout />
              </Route>
              <Route exact path='/github' component={() => window.location = 'https://github.com/mattbechtel1/succotash-frontend'} />
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
            }
        </div>
        <Footer />
    </div>
  }
}

export default connect(({user, loading}) => ({user, loading}), {setUser, loadPage, pageLoaded})(App);