import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Button, Typography, Container } from '@material-ui/core';
import FieldMenu from './FieldMenu'

import { topOfPage } from '../helpers/conversions'

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
    className={className || classes.topToolbarLink}
    onClick={topOfPage}>
      <Button size="small">{text}</Button>
  </Link>
}

const SignUpButton = ({className}) => <LogButton text='Register' url='/signup' className={className} />

const LogInButton = ({className}) => <LogButton text='Log in' url='/login' className={className} />

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
      { user ? <LogoutButton /> : <LogInButton />}
      </Toolbar>

      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        <Button>
          {user ? <>Welcome, {user.username}</> : <>Welcome</>}
        </Button>

        <Link
          to='/'
          className={classes.toolbarLink}
          onClick={topOfPage}
        >
          <Button>
            Home
          </Button>
        </Link>

        <Link
          to='/guide'
          className={classes.toolbarLink}
          onClick={topOfPage}
        >
          <Button>
            Guide
          </Button>
        </Link>
        
        {user ?
          <><Link
            to='/profile'
            className={classes.toolbarLink}
            onClick={topOfPage}
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