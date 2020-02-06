import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Toolbar, Button, IconButton, Typography, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import FieldMenu from './FieldMenu'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'flex-end',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration: 'none'
  },
}));


export default function Header() {
  
  const classes = useStyles();

  return <Container>
    <Toolbar className={classes.toolbar}>
      {/* <Button size="small">Subscribe</Button> */}
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        Succotash
      </Typography>
      {/* <IconButton>
        <SearchIcon />
      </IconButton>
      <Link to='/signup'>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Link> */}
    </Toolbar>
    <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      <Link
        to='/'
        className={classes.toolbarLink}
      >
        <Button>
          Home
        </Button>
      </Link>
      <Link
        to='/profile'
        className={classes.toolbarLink}
      >
        <Button>
          Profile
        </Button>
      </Link>
      <FieldMenu classes={classes}/>
    </Toolbar>
  </Container>
}