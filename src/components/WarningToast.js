import {Snackbar} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import React from 'react'
import {hideToast} from '../redux_files/actions'
import { connect } from 'react-redux'

const WarningToast = ({hideToast, text, open}) => <Snackbar open={open} autoHideDuration={6000} onClose={hideToast}>
        <Alert onClose={hideToast} severity="error">
            {text}
        </Alert>
    </Snackbar>

export default connect(({toast: {text, open}}) => ({text, open}), {hideToast})(WarningToast)