import React from 'react'
// import { Button, Form, Dropdown, Input, Container } from "semantic-ui-react";
import {makeStyles} from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { removeModal, saveNewField } from '../redux_files/actions'
import {DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, Button, FormControl, MenuItem } from '@material-ui/core'



class NewFieldForm extends React.Component {
    constructor() {
        super()
        this.state = {
            fieldName: '',
            xAxis: 1,
            yAxis: 1
        }
    }
    
    
    options = [
        { key: 1, value: 1, text: '1 bed' },
        { key: 2, value: 2, text: '2 beds' },
        { key: 3, value: 3, text: '3 beds' },
        { key: 4, value: 4, text: '4 beds' },
        { key: 5, value: 5, text: '5 beds' },
        { key: 6, value: 6, text: '6 beds' },
        { key: 7, value: 7, text: '7 beds' },
        { key: 8, value: 8, text: '8 beds' }
    ]

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value, 10) || e.target.value
        })
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
                margin: theme.spacing(1),
                minWidth: 50,
              },
            selectEmpty: {
                marginTop: theme.spacing(2),
              },
          }));          
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.saveNewField(this.state)
    }

    render() {
        const classes = this.useStyles()
        const {removeModal} = this.props
        const {fieldName, xAxis, yAxis } = this.state

        return  <>
            <DialogTitle id="form-dialog-title">Add New Field</DialogTitle>
            <form className={classes.root} onSubmit={this.submitHandler}>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates occasionally.
                    </DialogContentText>

                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="fieldName"
                            label="Field Name"
                            type="text"
                            value={fieldName}
                            onChange={this.changeHandler}
                            placeholder='New District Farm'              
                            fullWidth
                        />          
                    </div>
                    <span className='vert-center-span'>
                        <FormControl className={classes.formControl}>
                            <Select
                                name='xAxis'
                                value={xAxis}
                                onChange={this.changeHandler}
                            >
                                {this.options.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)}
                            </Select>
                        </FormControl> X <FormControl className={classes.formControl}><Select
                                name='yAxis'
                                value={yAxis}
                                onChange={this.changeHandler}
                            >
                                 {this.options.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </span>

                </DialogContent>
                <DialogActions>
                <Button onClick={removeModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={removeModal} type='submit' color="primary">
                    Let's Plant!
                </Button>
            </DialogActions>
            </form>
        </>
    }
}

export default connect(null, {removeModal, saveNewField})(NewFieldForm)