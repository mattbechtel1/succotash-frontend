import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Toolbar, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';

const Copyright = () => <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link to="/">
      Succotash
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>

const DevLink = () => {
  const classes = useStyles()
  
  return <Link 
    to='/developers'
    className={classes.footerLink} >
      <Button>For Developers</Button>
  </Link>
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(6, 0),
  },
  footerTitle: {
    flex: 1,
  },
  footerLink: {
    position: 'absolute',
    left: 0,
    flexShrink: 0,
    textDecoration: 'none'    
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Toolbar>
          <DevLink />
          <Container className={classes.footerTitle}>
            <Typography variant="h6" align="center" gutterBottom>
              Succotash
            </Typography>
            <Copyright />
          </Container>
        </Toolbar>
      </Container>
    </footer>
  );
}