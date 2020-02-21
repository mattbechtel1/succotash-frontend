import React from 'react'
import {Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


export const CancelButton = ({onClick}) => <Button onClick={onClick} color="secondary">Cancel</Button>

export const WarningButton = withStyles(theme => ({
    root: {
      color: theme.palette.warning.contrastText,
      backgroundColor: theme.palette.warning.dark,
      '&:hover': {
        backgroundColor: theme.palette.warning.main
      },
    },
  }))(Button);

export const GreenButton = ({callback, text, type}) => <Button onClick={callback} type={type} variant='contained' color='secondary'>{text}</Button>

