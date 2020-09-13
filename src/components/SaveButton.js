import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux'
import ConfirmSaveBox from '../field_view/ConfirmSaveBox'
import { saveStage, displayFifthModal, removeFifthModal } from '../redux_files/actions'

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

const CircularIntegrationSave = ({sidebar, stage, date, saveStage, modal5, removeFifthModal, displayFifthModal}) => {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: sidebar.successMessage,
  });

  const handleButtonClick = () => {
    if (!sidebar.saving) { 
      if (!stage.dateChanged || localStorage.getItem('autosave_CA9D01F')) {
        saveStage(stage, date)
      } else {
        displayFifthModal()
      }
    }
  };

  return (
    <>
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
      <Dialog open={modal5} onClose={removeFifthModal} aria-labelledby='form-dialog-title'>
          <ConfirmSaveBox saveFunc={() => saveStage(stage, date)}/>
      </Dialog>
    </>
  );
}

const mapStateToProps = ({ sidebar, stage, date, modal5 }) => ({ sidebar, stage, date, modal5 })

export default connect(mapStateToProps, {saveStage, removeFifthModal, displayFifthModal})(CircularIntegrationSave)