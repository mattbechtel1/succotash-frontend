import React, { useState } from 'react'
import { connect } from 'react-redux'

import {Paper, makeStyles, TextField, Typography, FormControl} from '@material-ui/core'
import { GreenButton } from '../components/Buttons'
import WarningToast from '../components/WarningToast'
import { displayWarning } from '../redux_files/actions'


const useStyles = makeStyles(theme => ({
    box: {
      padding: theme.spacing(2),
      margin: '16px',
      backgroundColor: theme.palette.primary.light,
      display: 'inline-block',
      width: '-webkit-fill-available'
    },
    input: {
        backgroundColor: 'white'
    },
    formControl: {
      margin: theme.spacing(1),
      display: 'flex'
    },
    form: {
      display: 'flex'
    }
  }));


const SuggestionBox = ({displayWarning}) => {
    const classes = useStyles()

    const [title, setTitle] = useState('')
    const [titleError, changeTitleError] = useState(false)
    const [bodyText, setBody] = useState('')
    const [bodyError, changeBodyError] = useState(false)

    const submitForm = (e) => {
      e.preventDefault()
      if (title.length < 5) {
        changeTitleError(true)
        displayWarning("Title must be at least 5 characters")
      } else if (bodyText.length <= title.length) {
        changeBodyError(true)
        displayWarning('Description must be more descriptive than title.')
      } else {
        alert("Submitted")
      }
    }

    return <Paper elevation={0} className={classes.box}>
      <WarningToast />
      <form>
        <Typography variant='h5'>Suggestion / Bug Report Form</Typography>
        <FormControl className={classes.formControl}>
          <TextField 
            className={classes.input}
            required
            error={titleError}
            label='Title'
            variant="outlined" 
            value={title} 
            onChange={(e) => {
              setTitle(e.target.value)
              changeTitleError(false)
            }} />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            fullWidth
            className={classes.input}
            required
            multiline
            rows={15}
            error={bodyError}
            label='Description of Issue or Suggestion'
            variant="outlined"
            value={bodyText}
            onChange={(e) => {
              setBody(e.target.value)
              changeBodyError(false)
            }} />
        </FormControl>

        <FormControl className={classes.formControl}>
          <GreenButton callback={submitForm} text={'Submit Ticket'} type='submit' />
        </FormControl>
      </form>
    </Paper>
}

export default connect(null, {displayWarning})(SuggestionBox)