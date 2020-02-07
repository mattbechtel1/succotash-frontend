import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
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
        { key: 6, value: 6, text: '6 beds' }
    ]

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: parseInt(e.target.value, 10) || e.target.value
        })
    }

    fieldNameChangeHandler = (e) => {
        this.setState({
            fieldName: e.target.value
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
                minWidth: 50,
                marginRight: '12px',
                marginLeft: '12px'
              },
            selectEmpty: {
                marginTop: '12px'
              },
          }));          
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.saveNewField(this.state, this.props.user)
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
                        Add a New Field to Manage on Succotash
                    </DialogContentText>

                    <div style={{marginBottom: '12px'}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="fieldName"
                            label="Field Name"
                            color='secondary'
                            type="text"
                            value={fieldName}
                            onChange={this.fieldNameChangeHandler}
                            placeholder='New District Farm'              
                            fullWidth
                        />          
                    </div>

                    <DialogContentText className={classes.selectEmpty}>
                        Provide a Size for Your field by the number of beds. Each bed should have the ability to grow a separate crop or set of crops.
                    </DialogContentText>
                    
                    <span className='vert-center-span'>
                        <FormControl className={classes.formControl} style={{marginRight: '12px'}} >
                            <Select
                                name='xAxis'
                                value={xAxis}
                                onChange={this.changeHandler}
                            >
                                {this.options.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)}
                            </Select>
                        </FormControl> X <FormControl className={classes.formControl} style={{marginLeft: '12px'}}>
                            <Select
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
                <Button onClick={removeModal} color="secondary">
                    Cancel
                </Button>
                <Button onClick={removeModal} type='submit' color="secondary">
                    Let's Plant!
                </Button>
            </DialogActions>
            </form>
        </>
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        removeModal: () => dispatch(removeModal()),
        saveNewField: (field, user) => dispatch(saveNewField(field, user, history))
    }
}

export default withRouter(connect(({user}) => ({user}), mapDispatchToProps)(NewFieldForm))