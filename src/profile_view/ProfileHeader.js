import React from 'react';
import { connect } from 'react-redux'
import {Typography, Dialog} from '@material-ui/core/';
import Vegetables from '../assets/vegetables.jpg'
import {displayModal, removeModal} from '../redux_files/actions'
import NewFieldForm from '../components/NewFieldForm'
import PageHeader from '../components/StaticPageHeader'


const AddFieldLinkHeader = ({displayModal, removeModal, modal}) => {
  
  const Footer = () => <Typography variant="subtitle1">
    Click here to add a field to your profile
  </Typography>
  
  return <>
    <PageHeader 
      text='Succotash allows anyone with a green thumb to plan and track their crop and produce growth and harvest with a user-friendly online interface.' 
      image={Vegetables}
      onClick={displayModal}
      footer={Footer}
    />

    <Dialog 
      open={modal}
      onClose={removeModal}
      aria-labelledby="form-dialog-title">
      <NewFieldForm />
    </Dialog>
  </>
}

export default connect(({modal}) => ({modal}), {displayModal, removeModal})(AddFieldLinkHeader)