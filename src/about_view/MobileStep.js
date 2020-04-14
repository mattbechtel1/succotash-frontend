import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        margin: '16px',
        backgroundColor: theme.palette.primary.light,
      }
}))

const MobileStep = ({title, text}) => {
    const classes = useStyles()

    return <Grid item xs={12}>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
            <Typography variant='h6' gutterBottom>{title}</Typography>
            <Typography variant='subtitle1' color='inherit' paragraph>{text}</Typography>
        </Paper>
    </Grid>
}

export default MobileStep