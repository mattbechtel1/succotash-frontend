import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

import {topOfPage} from '../helpers/conversions'

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    margin: '16px',
    backgroundColor: theme.palette.primary.light,
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

const StandardCards = ({user}) => {
  const classes = useStyles();

  const social = [
    { name: 'Twitter', icon: TwitterIcon, link: 'https://twitter.com/AppSuccotash' },
    { name: 'Facebook', icon: FacebookIcon, link: 'https://www.facebook.com/SuccotashApp/' },
    { name: 'GitHub', icon: GitHubIcon, link: 'https://github.com/mattbechtel1/succotash-frontend' }
  ]

  return (
    <Grid container spacing={10} style={{marginBottom: '1px', marginTop: '1px'}}>
      <Grid item xs={6}>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
          <Typography variant="h6" gutterBottom >
            Social
          </Typography>
          
          {social.map(network => (
            <a display='block' href={network.link} key={network.name} target='_blank' className='text-link' rel="noopener noreferrer">
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item>
                  <network.icon />
                </Grid>
                <Grid item>{network.name}</Grid>
              </Grid>
            </a>
        ))}
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <Paper elevation={0} className={classes.sidebarAboutBox}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography>
            Succotash helps farmers and gardeners track and plan crop cycles. 
            {user ? null : <Link to='/signup' className='text-link' onClick={topOfPage}> Sign up today!</Link>}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default connect(({user}) => ({user}))(StandardCards)