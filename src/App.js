import React from 'react';

import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { saveNewUser, seedCrops, loginUser, loadPage, pageLoaded, setInitialState } from './redux_files/actions'

import Field from './field_view/Field'
import Footer from './components/Footer'
import Navigation from './components/Header'
import Profile from './profile_view/Profile'
// import TestComponent from './TestComponent'
import NewFieldForm from './components/NewFieldForm'
import { Card, CircularProgress, Backdrop } from '@material-ui/core'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './home_view/Home'
import HowToPage from './about_view/HowTo'

class App extends React.Component {

  componentDidMount() {
    this.props.loadPage()
    let token = localStorage.getItem('token')
    let action = {}
    
    if (token) {
      // if token found, get both user and crop list
      Promise.all([
        fetch(process.env.REACT_APP_DOMAIN + '/api/v1/profile', {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}` }
        }),
        fetch(process.env.REACT_APP_DOMAIN + '/crops')
      ])
      .then(async (responses) => {
        
        await responses[0].json()
        .then(user => {
          action['user'] = user
        })
  
        await responses[1].json()
        .then(crops => {
          action['crops'] = crops
        })
        return action
      })
      .then(data => {
        this.props.setInitialState(data)
      })

    } else {
      // if no token, load only crop list
      fetch(process.env.REACT_APP_DOMAIN + '/crops')
      .then(response => response.json())
      .then(crops => {
        this.props.seedCrops(crops)
        this.props.pageLoaded()
      })
    }
  }

  render() {
    const {user, loading, fields} = this.props
    
    return <div className="App">
          <Navigation />
          
          <div className='bg-img'>
            <Switch>
              {/* <Route path='/test' component={TestComponent} /> */}

              <Route path='/guide'>
                <HowToPage />
              </Route>
              
              <Route path='/login'>
                { user ? <Redirect to='/profile' /> : <Login submitAction={loginUser} displayText='Log in' />}
              </Route>
              
              <Route path='/signup'>
                { user ? <Redirect to='/profile' /> : <Login submitAction={saveNewUser} displayText='Sign up'/> }
              </Route>
              
              <Route path='/profile'>
                { user ? <Profile /> : <Redirect to='/' /> }
              </Route>
              
              <Route exact path='/field/new'>
                { user ?
                  <div style={{display: 'inline-block'}}>
                    <Card style={{marginTop: '10px'}}>
                      <NewFieldForm />
                    </Card>
                  </div>

                :
                  <Redirect to='/' /> 
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
                { user ? <Redirect to='/profile' /> : <Home /> }
              </Route>

            </Switch>
          </div>
      <Footer />
      <Backdrop style={{zIndex: 1}} open={loading || fields.loading}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  }
}

export default connect(({user, loading, fields}) => ({user, loading, fields}), {loadPage, seedCrops, pageLoaded, setInitialState})(App);