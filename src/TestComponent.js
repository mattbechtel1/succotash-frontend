import React from 'react'
import {Backdrop, CircularProgress, Button} from '@material-ui/core'
import {makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { loadPage, pageLoaded } from './redux_files/actions'

const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

 const TestComponent = (props) => {
        const classes = useStyles()
        debugger
        return           <div>

            <Button onClick={props.loadPage}>LOADING</Button>
            <Button onClick={props.pageLoaded}>STOP LOADING</Button>
        <Backdrop className={classes.backdrop} open={props.loading}>
          <CircularProgress color="primary" />

        </Backdrop>
          </div>
    }

export default connect(({fields, loading}) => ({fields, loading}), {loadPage, pageLoaded})(TestComponent)