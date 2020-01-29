import React from 'react';
import './App.css';
import NewFieldForm from './components/newFieldForm';
import { connect } from 'react-redux'
import CalendarBar from './components/DateBar'

const App = ({date}) => {
  
  function formatDate(date) {
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
  }
  console.log('rendering App')
  return (
    <div className="App">
      <CalendarBar />
      <NewFieldForm />
      <p>The store's date is {formatDate(date)}</p>
    </div>
  );
}

const mapStateToProps = ({date}) => ({date})

export default connect(mapStateToProps)(App);
