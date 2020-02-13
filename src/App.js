import React from 'react';
import './App.css';
import Field from './field_view/Field'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import Navigation from './components/Header'
import { Route, Switch, Redirect } from 'react-router-dom'
import { saveNewUser, setUser, seedCrops, loginUser, loadPage, pageLoaded } from './redux_files/actions'
import Profile from './profile_view/Profile'
// import TestComponent from './TestComponent'
import NewFieldForm from './components/NewFieldForm'
import { Card, CircularProgress, Backdrop } from '@material-ui/core'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './home_view/Home'

class App extends React.Component {

  componentDidMount() {
    this.props.loadPage()
    let token = localStorage.getItem('token')
    
    if (token) {
      Promise.all([
        fetch(process.env.REACT_APP_DOMAIN + '/api/v1/profile', {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}` }
        }),
        fetch(process.env.REACT_APP_DOMAIN + '/crops')
      ])
      .then(responses => {
        responses[0].json()
        .then(this.props.setUser)

        responses[1].json()
        .then(this.props.seedCrops)
      })
      .then(this.props.pageLoaded)

    } else {
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
        <Navigation className='top-bottom-bg' />
          <div className='bg-img'>
            <Switch>
              {/* <Route path='/test' component={TestComponent} /> */}
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

export default connect(({user, loading, fields}) => ({user, loading, fields}), {setUser, loadPage, seedCrops, pageLoaded})(App);