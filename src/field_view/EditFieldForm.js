import React from 'react'
import {GreenButton} from '../components/Buttons'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button, DialogTitle, DialogContent, FormControlLabel, DialogContentText, Tooltip, DialogActions, TextField, FormControl, RadioGroup, Radio, Avatar } from '@material-ui/core'
import {formStyles} from '../helpers/themeOverrides'
import {editFieldName, removeFourthModal, editFieldPic, saveFieldUpdate} from '../redux_files/actions'
import wheat from '../assets/wheat.jpg'
import basil from '../assets/basil.jpg'
import chickpeas from '../assets/chickpeas.jpg'
import grass from '../assets/grass.jpg'
import dirt from '../assets/dirt.jpg'
import flowers from '../assets/flowers.jpg'



const EditFieldForm = ({field, history, editFieldName, editFieldPic, saveFieldUpdate, removeFourthModal, fieldForm: {name, pic}}) => {
    const classes = formStyles
    
    const {name: defaultName, pic_opt: defaultPic, id} = field

    if (name === 'YOUR FIELD NAME HERE') {
        editFieldName(defaultName)
    }

    if (defaultPic && pic === 'YOUR PIC URL HERE') {
        editFieldPic(defaultPic)
    } else if (!defaultPic && pic === 'YOUR PIC URL HERE') {
        editFieldPic('soil')
    }

    const picOptions = [
        {pic: dirt, value: 'soil'},
        {pic: wheat, value: 'wheat'},
        {pic: chickpeas, value: 'legumes'},
        {pic: basil, value: 'herb'},
        {pic: grass, value: 'grass'},
        {pic: flowers, value: 'flowers'}
    ]

    const submitHandler = (e) => {
        e.preventDefault()
        saveFieldUpdate(id, e.target.field_name.value, e.target.pic.value, history)
        removeFourthModal()
    }

    return <>
        <DialogTitle>Edit Field</DialogTitle>
        <form onSubmit={submitHandler}>
            <DialogContent className={classes.root}>

                <div style={{marginBottom: '12px'}}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        name="field_name"
                        label="Field Name"
                        color='secondary'
                        type="text"
                        value={name}
                        onChange={(e) => editFieldName(e.target.value)}
                        fullWidth
                        />          
                </div>

                <DialogContentText>
                    Select a default picture for this field to display alongside the field on your profile page.
                </DialogContentText>

                <FormControl style={{display: 'flex', marginBottom: '12px'}}>

                    <RadioGroup aria-label='photo' value={pic} name='pic' row onChange={(e) => editFieldPic(e.target.value)}>
                        {picOptions.map(option => {
                            return <FormControlLabel
                            key={option.value}
                            value={option.value}
                            control={<Radio/>}
                            label={<Tooltip title={option.value} key={option.value}>
                                <Avatar alt={option.value} src={option.pic} className={classes.large} />
                            </Tooltip>}
                            
                            /> 
                        })}
                    </RadioGroup>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={removeFourthModal} color='secondary'>
                    Cancel
                </Button>
                <GreenButton type='submit' text={'Save Changes'} />
            </DialogActions>
        </form>
    </>
}


export default withRouter(connect(({fieldForm}, {history}) => ({fieldForm, history}), {editFieldName, editFieldPic, saveFieldUpdate, removeFourthModal})(EditFieldForm))