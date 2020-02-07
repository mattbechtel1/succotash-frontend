import {Snackbar, makeStyles} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import React from 'react'
import {hideToast} from '../redux_files/actions'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const WarningToast = ({hideToast, text, open}) => {
    const classes = useStyles()

    return <Snackbar open={open} autoHideDuration={6000} onClose={hideToast}>
        <Alert onClose={handleClose} severity="error">
            {text}
        </Alert>
        </Snackbar>
}

export default connect(({toast: {text, open}}) => ({text, open}), {hideToast})(WarningToast)