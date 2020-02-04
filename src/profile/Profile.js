import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Grid, Container, CircularProgress, Backdrop} from '@material-ui/core';
import MainFeaturedPost from './ProfileHeader';
import FieldTile from './FieldTile';
import Main from './Main';
import Sidebar from './Sidebar';


const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



const Profile = ({fields: {fields, loading}}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color='inherit' />
      </Backdrop>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost />
          <Grid container spacing={4}>
            {fields.map(field => (
              <FieldTile key={field.name} field={field} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main />
            <Sidebar />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = ({fields}) => ({fields})

export default connect(mapStateToProps)(Profile)

