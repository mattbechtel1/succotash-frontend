import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { saveStage } from '../redux_files/actions'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

const CircularIntegrationSave = ({sidebar, stage, date, saveStage}) => {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: sidebar.successMessage,
  });

  const handleButtonClick = () => {
    if (!sidebar.saving) { saveStage(stage, date) }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="secondary"
          className={buttonClassname}
          disabled={sidebar.saving}
          onClick={handleButtonClick}
        >
          {sidebar.successMessage ? <>SAVED!</> : <>SAVE</> }
        </Button>
        {sidebar.saving && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}

const mapStateToProps = ({sidebar, stage, date}) => ({sidebar, stage, date}) 

export default connect(mapStateToProps, {saveStage})(CircularIntegrationSave)