import React from 'react'
import {Switch, Route} from 'react-router-dom' 
import NewFieldForm from '../components/newFieldForm'
import Field from '../components/Field'

const FieldDisplay = props => {
    return <Switch>
        <Route path='/field/new' component={NewFieldForm} />
        <Route path='/field/:slug'>
            <Field />
        </Route>
    </Switch>
}


export default FieldDisplay