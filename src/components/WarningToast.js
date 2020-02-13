import {Snackbar, Slide} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import { connect } from 'react-redux'
import React from 'react'
import {hideToast} from '../redux_files/actions'

const WarningToast = ({hideToast, text, open}) => {
    function SlideTransition(props) {
        return <Slide {...props} directon='right' />
    }

    return <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={hideToast}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            TransitionComponent={SlideTransition}        
        >
            <Alert onClose={hideToast} variant='filled' severity="error">
                {text}
            </Alert>
        </Snackbar>
}

export default connect(({toast: {text, open}}) => ({text, open}), {hideToast})(WarningToast)