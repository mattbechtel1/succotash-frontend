import React from 'react'
import {DatePicker} from '@material-ui/pickers'
import {makeStyles} from '@material-ui/core/styles'
import {DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions, FormControl, ThemeProvider, Select, MenuItem} from '@material-ui/core/'
import {datePickerOverride} from '../helpers/themeOverrides'
import { Event as CalIcon} from '@material-ui/icons'
import { removeSecondModal, addTodo } from '../redux_files/actions'
import { connect } from 'react-redux'


class NewDeadlineForm extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            note: "",
            due_date: new Date(),
            field: null,
            field_id: '',
            bed_id: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeField = (e) => {
        this.setState({
            field_id: e.target.value,
            field: this.props.user.fields.find(field => field.id === e.target.value)
        })
    }

    changeDueDate = (date) => {
        this.setState({due_date: date})
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.addTodo(this.state, this.props.user)
        this.props.removeSecondModal()
    }

    useStyles = () => {
        return makeStyles(theme => ({
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
    }

    render() {        
        const {note, due_date, field, field_id, bed_id} = this.state
        const classes = this.useStyles()

        const fieldOptions = this.props.user ? this.props.user.fields.map(field => (
            { key: field.name, value: field.id, text: field.name }))
            : []
        
        const bedOptions = field ? field.beds.map(bed => (
            { key: bed.name, value: bed.id, text: bed.name }
        )) : []

        return  <>
            <DialogTitle id="form-dialog-title">Add a New Item to Your Task List</DialogTitle>
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

                <ThemeProvider theme={datePickerOverride}>

                    <DialogContentText className={classes.selectEmpty}>
                        Set an end date for this task:
                    </DialogContentText>    
           
                    <FormControl className={classes.formControl} style={{marginRight: '12px', marginBottom: '12px'}} >
                        <span>
                            <CalIcon />
                            <DatePicker 
                                value={due_date}
                                minDate={'2015-01-01'}
                                onChange={(d) => this.changeDueDate(d)}
                                name="due_date"
                                showTodayButton
                                animateYearScrolling /> 
                        </span>
                    </FormControl>
                </ThemeProvider>

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
                            {fieldOptions.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <DialogContentText className={classes.selectEmpty}>
                        Assign this task to a bed (optional):
                    </DialogContentText>  
                    
                    <FormControl className={classes.formControl} style={{marginRight: '12px', marginBottom: '12px'}} >
                        <Select
                            name='bed_id'
                            value={bed_id}
                            onChange={this.changeHandler}
                            disabled={!field}
                        >
                            <MenuItem value={''} key='default'>None</MenuItem>
                            {bedOptions.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)}
                        </Select>
                    </FormControl>
                </DialogContent>
                    
            <DialogActions>
                <Button onClick={this.props.removeSecondModal} color="secondary">
                    Cancel
                </Button>
                <Button type='submit' color="secondary">
                    Add Task
                </Button>
            </DialogActions>
            </form>
        </>
    }
}

export default connect(({user}) => ({user}), {removeSecondModal, addTodo})(NewDeadlineForm)