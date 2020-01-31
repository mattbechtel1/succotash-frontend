import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import NewFieldForm from '../components/newFieldForm'
import Field from '../components/Field'

const FieldDisplay = () => {
    return <Switch>
        <Route path='/field/new' component={NewFieldForm} />
        <Route exact path='/field/:slug'>
            <Field />
        </Route>
        <Route path='/field/:slug?date='>
            <Field />
        </Route>
    </Switch>
}

export default FieldDisplay