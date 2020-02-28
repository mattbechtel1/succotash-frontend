import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Paper, Dialog, DialogActions } from '@material-ui/core'
import { GreenButton } from '../components/Buttons'
import Image from 'material-ui-image'
import {displayModal, removeModal} from '../redux_files/actions'
import { connect } from 'react-redux'

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

const Step = ({imagePosition, title, text, image, modal, displayModal, removeModal}) => {
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
                onClick={displayModal}
            />
        </Paper>
    </Grid>

    const ImageModal = () => <Dialog open={modal} onClose={removeModal} fullWidth>        

            <Image
                src={image}
                disableSpinner
                aspectRatio={(16/9)}
            />

        <DialogActions>
            <GreenButton callback={removeModal} text='Close' />
        </DialogActions>
    </Dialog>


    if (imagePosition === 'right') {
        return <>
            <Info />
            <Animation />
            <ImageModal />
        </>
    } else {
        return <>
            <Animation />
            <Info />
            <ImageModal />
        </>
    }
}

export default connect(({modal}) => ({modal}), {displayModal, removeModal})(Step)