import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Grid, Container, CircularProgress, Backdrop} from '@material-ui/core';
import ProfileHeader from './ProfileHeader';
import FieldTile from './FieldTile';
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
        <main style={{paddingTop: '10px'}}>
          <ProfileHeader />
          <Grid container spacing={4}>
            {fields.map(field => (
              <FieldTile key={field.name} field={field} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Sidebar />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}

export default connect(({fields}) => ({fields}))(Profile)

