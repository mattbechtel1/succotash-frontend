import React from 'react';
import { connect } from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {Typography, Paper, Dialog, Grid} from '@material-ui/core/';
import Vegetables from '../assets/vegetables.jpg'
import {displayModal, removeModal} from '../redux_files/actions'
import NewFieldForm from '../components/NewFieldForm'

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(../assets/vegetables.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    cursor: 'pointer',
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const AddFieldLink = ({displayModal, removeModal, modal}) => {
  const classes = useStyles();

return <>
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${Vegetables})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={Vegetables} alt='vegetables' />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent} onClick={displayModal}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Welcome to Succotash
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Succotash allows anyone with a green thumb to plan and track their crop and produce growth and harvest with a user-friendly online interface.
            </Typography>
            <Typography variant="subtitle1">
              Click here to add a field to your profile
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>

    <Dialog open={modal} onClose={removeModal} aria-labelledby="form-dialog-title">
       <NewFieldForm />
    </Dialog>
  </>
}

const mapStateToProps = ({modal}) => ({modal})

export default connect(mapStateToProps, {displayModal, removeModal})(AddFieldLink)