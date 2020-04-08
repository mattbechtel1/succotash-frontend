import React from 'react'

import { connect } from 'react-redux'
import {zoomImage} from '../redux_files/actions'

import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Paper } from '@material-ui/core'
import Image from 'material-ui-image'
import ImageZoom from './ImageZoom'

const useStyles = makeStyles(theme => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        margin: '16px',
        backgroundColor: theme.palette.primary.light,
      },
    sidebarImageBox: {
        padding: theme.spacing(2),
        margin: '16px',
        backgroundColor: theme.palette.secondary.light
    }
}))

const Step = ({imagePosition, title, text, image, zoomImage}) => {
    const classes = useStyles()

    const Info = () => <Grid item xs={7}>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
            <Typography variant='h6' gutterBottom>{title}</Typography>
            <Typography variant='subtitle1' color='inherit' paragraph>{text}</Typography>
        </Paper>
    </Grid>

    const Animation = () => <Grid item xs={5}>
        <Paper elevation={0} className={classes.sidebarImageBox}>
            <Image
                src={image}
                disableSpinner
                aspectRatio={(16/9)}
                onClick={() => zoomImage(image)}
                style={{cursor: 'zoom-in'}}
            />
        </Paper>
    </Grid>

    if (imagePosition === 'right') {
        return <>
            <Info />
            <Animation />
            <ImageZoom />
        </>
    } else {
        return <>
            <Animation />
            <Info />
            <ImageZoom />
        </>
    }
}

export default connect(null, {zoomImage})(Step)