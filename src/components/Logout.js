import React from 'react'
import { unsetUser } from '../redux_files/actions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Logout = ({unsetUser}) => {
    unsetUser()
    return <Redirect to='/' />
}

export default connect(null, {unsetUser})(Logout)