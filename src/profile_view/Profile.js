import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Grid, Container, CircularProgress, Backdrop, Card, CardContent} from '@material-ui/core';
import ProfileHeader from './ProfileHeader';
import FieldTile from './FieldTile';
import StandardCards from '../components/StandardCards';
import TodoContainer from '../components/TodoContainer'


const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  card: {
    display: 'inline-block',
    backgroundColor: theme.palette.primary.main
  },
}));

const Profile = ({fields: {fields, loading}, todos: {loading: tLoading, todos}}) => {
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

          <Grid container spacing={3} className={classes.mainGrid}>
            <Container>
              <Card className={classes.card}>
                <CardContent>  
                  {tLoading ? <CircularProgress color='secondary' /> : <TodoContainer todos={todos} /> }
                </CardContent>
              </Card>
            </Container>
          </Grid>

          <Grid container spacing={5} className={classes.mainGrid}>
            <StandardCards />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
}

export default connect(({fields, todos}) => ({fields, todos}))(Profile)

