import React from 'react';
import {GreenButton} from './Buttons'
import {Avatar, Button, TextField, Grid, Typography, Container} from '@material-ui/core/'
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import WarningToast from './WarningToast'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { changeTextField } from '../redux_files/actions'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundClip: 'padding-box',
    paddingLeft: '10px',
    paddingRight: '10px'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    margin: theme.spacing(3)
  }
}));

const ButtonLink = ({url, text}) => {
  const classes = useStyles()

  return <Link to={url} className={classes.link}><GreenButton text={text} /></Link>
}

const Login = ({submitAction, displayText, login, resetCode, changeTextField}) => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault()
    submitAction(login.email, login.username, login.password, login.confirmPassword, resetCode)
  }

  const handleChange = (e) => {
    changeTextField(e.target.name, e.target.value)
  }

  return (
    <Container component="main" maxWidth="xs" style={{paddingTop: '1px', paddingBottom: '10px'}}>
      <WarningToast />
      <div className={classes.paper}>
        
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {displayText}
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                value={login.username}
                required
                fullWidth
                color='secondary'
                id="userName"
                label="Username"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            { displayText !== 'Log in' ?
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  value={login.email}
                  color='secondary'
                  id="email"
                  label="Email Address"
                  onChange={handleChange}
                  autoComplete="off"
                  type="email"
                  />
              </Grid>
              : null
            }
            { displayText !== 'Send password reset' ? 
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={login.password}
                color='secondary'
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Grid>
            : null
          }
          { resetCode ?
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm_password"
                value={login.confirmPassword}
                color='secondary'
                label="Confirm Password"
                type="password"
                id="confirm_password"
                onChange={handleChange}
              />
            </Grid>
            : null
          }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {displayText}
          </Button>
          <Grid container justify='center' style={{padding: '10px'}}>
            <Grid item>
              { displayText === 'Log in' ? 
                <Container style={{padding: 'inherit'}}>
                  <ButtonLink 
                    url='/signup'
                    text="Don't have an account? Sign up!" />
                  <Link to='/reset-password'>Forgot your password? Click here.</Link>
                </Container>
                :
                  <ButtonLink 
                    url='/login'
                    text="Already have an account? Sign in."
                  />
              }
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch, {submitAction}) => {
  return {
    changeTextField: (fieldName, value) => dispatch(changeTextField(fieldName, value)),
    submitAction: (username, password, email) => dispatch(submitAction(username, password, email)),
  }
}

export default withRouter(connect(({login}, {match}) => ({login, resetCode: match.params.slug}), mapDispatchToProps)(Login))