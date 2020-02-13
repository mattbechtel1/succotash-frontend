import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Toolbar, Button, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FieldMenu from './FieldMenu'
import { connect } from 'react-redux'

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
  topToolbarLink: {
    position: 'absolute',
    right: 0,
    flexShrink: 0,
    textDecoration: 'none'    
  }
}));

const SigninButton = () => <Link to='/login'>
    <Button 
      variant="outlined" 
      size="small">
        Sign in
    </Button>
  </Link>

const LogoutButton = () => {
  const classes = useStyles()

  return <Link 
    to='/logout'
    className={classes.topToolbarLink}>
    <Button size="small">
      Log out
    </Button>
  </Link>
}

const SignUpButton = () => {
  const classes = useStyles()

  return <Link 
    to='/signup'
    className={classes.topToolbarLink}>
    <Button size="small">
      Register
    </Button>
  </Link>
}

const Header = ({user}) => {
  const classes = useStyles();
  
  return <div className='top-bottom-bg'>
    <Container>
      <Toolbar className={classes.toolbar}>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Succotash
          {/* <Image src={logo} /> */}
        </Typography>
      { user ? <LogoutButton /> : <SignUpButton />}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          <Link
            to='/'
            className={classes.toolbarLink}
          >
            <Button>
              {user ? <>Welcome, {user.username}</> : <>Welcome</>}
            </Button>
          </Link>

        <Link
          to='/'
          className={classes.toolbarLink}
        >
          <Button>
            Home
          </Button>
        </Link>
        
        {user ?
          <><Link
          to='/profile'
          className={classes.toolbarLink}
          >
            <Button>
              Profile
            </Button>
          </Link>
          <FieldMenu classes={classes}/></>
        : 
          <SigninButton />
        }
      </Toolbar>
    </Container>
  </div>
}

export default connect(({user}) => ({user}))(Header)