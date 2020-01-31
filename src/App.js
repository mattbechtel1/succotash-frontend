import React from 'react';
import './App.css';
import FieldDisplay from './containers/FieldDisplay'
import { connect } from 'react-redux'
import CalendarBar from './components/DateBar'
import Navigation from './components/NavBar'
import { Route, Switch } from 'react-router-dom'
import { fetchFields } from './redux_files/actions'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchFields()
  }
  
  formatDate(date) {
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
  }

  render() {
    return <div className="App">
        <Navigation />
        <Switch>
          <Route path='/login'>
            Login Component goes here
          </Route>
          <Route path='/signup'>
            Signup Component goes here
          </Route>
          <Route path='/profile'>
            PROFILE GOES HERE
          </Route>
          <Route path='/field'>
            <FieldDisplay />
          </Route>
          <Route exact path='/'>
            Homepage goes here
            <CalendarBar />
            <p>The store's date is {this.formatDate(this.props.date)}</p>
          </Route>
        </Switch>
    </div>
  }
}

const mapStateToProps = ({date}) => ({date})

export default connect(mapStateToProps, {fetchFields})(App);