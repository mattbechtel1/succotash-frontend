import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControl,Select, MenuItem} from '@material-ui/core/'
import { removeSecondModal, addTodo } from '../redux_files/actions'
import { connect } from 'react-redux'
import { menuItemsByOptions } from '../helpers/conversions'
import {GreenButton, CancelButton} from './Buttons'
import SuccotashDatePicker from './SuccotashDatePicker'

class NewDeadlineForm extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            note: "",
            due_date: new Date(),
            field_id: props.defaultField ? props.defaultField.id : '',
            bed_id: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    changeField = (e) => {
        this.setState({
            field_id: e.target.value,
            field: this.props.user.fields.find(field => field.id === e.target.value)
        })
        if (!e.target.value) {
            // automatically sets bed to none if there is no field association
            this.setState({bed_id: ''})
        }
    }

    changeDueDate = (date) => {
        this.setState({due_date: date})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.addTodo(this.state, this.props.user)
        this.props.removeSecondModal()
    }

    useStyles = makeStyles(theme => ({
        root: {
            '& > *': {
            margin: theme.spacing(1),
            width: 400,
            },
        },  
        formControl: {
            minWidth: 50,
            marginRight: '12px',
            marginLeft: '12px',
            marginBottom: '12px'
            },
        selectEmpty: {
            marginTop: '12px'
            },
    }));          

    render() {        
        const {note, due_date, field_id, bed_id} = this.state
        const {fields: {fields}} = this.props
        const classes = this.useStyles
    
        const fieldOptions = fields.map(field => (
            { key: field.name, value: field.id, text: field.name }))
        
        const activeField = field_id ? fields.find(field => field.id === field_id) : null

        const bedOptions = activeField ? activeField.beds.map(bed => (
            { key: bed.name, value: bed.id, text: bed.name }
        )) : []
        
        return  <>
            <DialogTitle>Add a New Item to Your Task List</DialogTitle>
            <form className={classes.root} onSubmit={this.submitHandler}>
                <DialogContent>
                    <DialogContentText>
                        Add a New Deadline on Succotash
                    </DialogContentText>

                    <div style={{marginBottom: '12px'}}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="note"
                            label="Description"
                            color='secondary'
                            type="text"
                            value={note}
                            onChange={this.changeHandler}
                            placeholder='Seed field'              
                            fullWidth
                        />          
                    </div>


                    <DialogContentText className={classes.selectEmpty}>
                        Set an end date for this task:
                    </DialogContentText>
           
                    <FormControl className={classes.formControl} style={{marginRight: '12px', marginBottom: '12px'}} >
                        <SuccotashDatePicker 
                            value={due_date} 
                            name='due_date'
                            showToday={true} 
                            dateChangeAction={this.changeDueDate}
                        />
                    </FormControl>

                    <DialogContentText className={classes.selectEmpty}>
                        Assign this task to a field (optional):
                    </DialogContentText>
                    
                    <FormControl className={classes.formControl} style={{marginRight: '12px', marginBottom: '12px'}} >
                        <Select
                            name='field'
                            value={field_id}
                            onChange={this.changeField}
                        >
                            <MenuItem value={''} key='default'>None</MenuItem>
                            {menuItemsByOptions(fieldOptions)}
                        </Select>
                    </FormControl>

                    <DialogContentText className={classes.selectEmpty}>
                        Assign this task to a sub-division (optional):
                    </DialogContentText>  
                    
                    <FormControl className={classes.formControl} style={{marginRight: '12px', marginBottom: '12px'}} >
                        <Select
                            name='bed_id'
                            value={bed_id}
                            onChange={this.changeHandler}
                            disabled={!activeField}
                        >
                            <MenuItem value={''} key='default'>None</MenuItem>
                            {bedOptions.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                    
            <DialogActions>
                <CancelButton onClick={this.props.removeSecondModal} />
                <GreenButton type='submit' text='Add Task' />
            </DialogActions>
            </form>
        </>
    }
}

export default connect(({user, fields}) => ({user, fields}), {removeSecondModal, addTodo})(NewDeadlineForm)