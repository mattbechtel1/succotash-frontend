import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/">
        Succotash
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(6, 0),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Succotash
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}