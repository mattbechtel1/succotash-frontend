import React from 'react'
import {Switch, Route} from 'react-router-dom'
import NewFieldForm from '../components/NewFieldForm'
import Field from './Field'

const FieldDisplay = () => {
    return <Switch>
        <Route exact path='/field/new' component={NewFieldForm} />
        <Route path='/field/:slug'>
            <Field />
        </Route>
        {/* <Route path='/field/:slug?date='>
            <Field />
        </Route> */}
    </Switch>
}

export default FieldDisplay