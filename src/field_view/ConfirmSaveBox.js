import React, { useState } from 'react'
import { connect } from 'react-redux'

import { DialogContent, DialogTitle, DialogContentText, DialogActions, ListItem, Checkbox, ListItemText, } from '@material-ui/core'
import { CancelButton, GreenButton } from '../components/Buttons'
import { formStyles } from '../helpers/themeOverrides'
import { removeFifthModal } from '../redux_files/actions'


const ConfirmSaveBox = ({removeFifthModal, saveFunc}) => {
    const [boxChecked, toggleChecked] = useState(false)
    
    const confirmationFunc = (e) => {
        e.preventDefault()
        if (boxChecked) {
            localStorage.setItem('autosave_CA9D01F', 'allow')
        }
        saveFunc()
        removeFifthModal()
    }

    const classes = formStyles()

    return <>
        <DialogTitle>Are you sure you want to save?</DialogTitle>
        <form className={classes.root} onSubmit={confirmationFunc}>
            <DialogContent>
                <DialogContentText>
                    Changing the beginning or end dates of a stage will dynamically overwrite
                    dates for which you previously had data. Are you sure you want to continue?
                </DialogContentText>
                <ListItem dense button onClick={() => toggleChecked(!boxChecked)}>
                    <Checkbox
                        edge='start'
                        checked={boxChecked}
                        tabIndex={-1}
                    />
                    <ListItemText primary='Do not show this message again.' />
                </ListItem>
            </DialogContent>
            <DialogActions>
                <CancelButton onClick={removeFifthModal} />
                <GreenButton type='submit' color='secondary' text={'Confirm Save'} />
            </DialogActions>
        </form>
    </>
}

export default connect(null, {removeFifthModal})(ConfirmSaveBox)
