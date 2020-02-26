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

const LogButton = ({text, url, className}) => {
  const classes = useStyles()

  return <Link 
    to={url}
    className={className || classes.topToolbarLink}>
      <Button size="small">{text}</Button>
  </Link>
}

const SignUpButton = ({className}) => <LogButton text='Register' url='/signup' className={className} />

const LogoutButton = ({className}) => <LogButton text='Log out' url='/logout' className={className} />

const Header = ({user}) => {
  const classes = useStyles();
  
  return <div className='header-bg'>
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
        </Typography>
      { user ? <LogoutButton /> : <SignUpButton />}
      </Toolbar>

      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        <Button>
          {user ? <>Welcome, {user.username}</> : <>Welcome</>}
        </Button>

        <Link
          to='/'
          className={classes.toolbarLink}
        >
          <Button>
            Home
          </Button>
        </Link>

        <Link
          to='/about'
          className={classes.toolbarLink}
        >
          <Button>
            About
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
          <SignUpButton className={classes.toolbarLink} />
        }
      </Toolbar>
    </Container>
  </div>
}

export default connect(({user}) => ({user}))(Header)