import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Toolbar, Button, IconButton, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));


const Header = ({fields: {fields}}) => {
  const classes = useStyles();
  
  const first3fields = fields.length > 0 ? fields.slice(0, Math.min(fields.length, 3)) : []
  
  const sections = [
    { title: 'Home', url: '/profile' },
    ...first3fields.map(field => {
    return { title: field.name, url: `/field/${field.slug}`}
  })
    // { title: 'About', url: '#' },
    // { title: 'Log Off', url: '#' },
  ];

  return (
    <React.Fragment>
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
        {sections.map(section => (
          <Link
            key={section.title}
            variant="body2"
            to={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

const mapStateToProps = ({fields}) => ({fields})

export default connect(mapStateToProps)(Header)