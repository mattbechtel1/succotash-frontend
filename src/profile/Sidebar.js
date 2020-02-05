import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core/';
import { Link } from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(theme => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    margin: '16px',
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar() {
  const classes = useStyles();

  const social = [
    { name: 'GitHub', icon: GitHubIcon, link: '/github' },
    // { name: 'Twitter', icon: TwitterIcon, link: '#' },
    // { name: 'Facebook', icon: FacebookIcon, link: '#' },
  ]

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography>
          Succotash helps farmers track growth and crop cycles. Sign up today!
        </Typography>
      </Paper>
      <Paper elevation={0} className={classes.sidebarAboutBox}>

        <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
          Social
        </Typography>
        
        {social.map(network => (
          <Link display="block" to={network.link} key={network.name} className='text-link'>
            <Grid container direction="row" spacing={1} alignItems="center">
              <Grid item>
                <network.icon />
              </Grid>
              <Grid item>{network.name}</Grid>
            </Grid>
          </Link>
      ))}
      </Paper>
    </Grid>
  );
}