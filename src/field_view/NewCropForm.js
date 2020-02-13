import React from 'react'
import { Select, DialogActions, Button, FormControl, DialogContent, TextField, InputLabel, DialogTitle, DialogContentText } from '@material-ui/core'
import { formStyles } from '../helpers/themeOverrides'
import { removeThirdModal, addCrop, displayWarning, hideToast } from '../redux_files/actions'
import { connect } from 'react-redux'
import { menuItemsByOptions } from '../helpers/conversions'
import GreenButton from '../components/GreenButton'

class NewCropForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            default_measure: '',
            category: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        if (this.state.name && this.state.default_measure && this.state.category) {
            this.props.addCrop(this.state)
            this.props.removeThirdModal()
        } else {
            this.props.displayWarning("Please fill out all the fields in the form.")
            setTimeout(() => {
                this.props.hideToast()
            }, 3000)
        }
    }

    render() {
        const classes = formStyles
        const {name, default_measure, category} = this.state
        const {removeThirdModal} = this.props

        const categories = [
            'Vegetable',
            'Fruit',
            'Legume',
            'Grain',
            'Flower',
            'Grass',
            'Herb',
            'Other'
        ]

        const measurementOptions = [
            'Bushel',
            'Count',
            'Bunch',
            'Peck',
            'Pounds',
            'Crate',
            'Dry quart'
        ]

        const optionsToObjects = (options) => {
            return options.map(option => {
                return {key: option, value: option.toLowerCase(), text: option}
            })
        }

        return <>
            <DialogTitle>Add a New Crop Option</DialogTitle>
            <form className={classes.root} onSubmit={this.submitHandler}>
                <DialogContent>
                    <DialogContentText>
                        Provide Your New Agricultural Product's Common Name
                    </DialogContentText>

                    <div style={{marginBottom: '12px'}}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="name"
                            label="Description"
                            color='secondary'
                            type="text"
                            value={name}
                            onChange={this.handleChange}
                            placeholder='carrots'              
                            fullWidth
                            />          
                    </div>

                    <DialogContentText>
                        Which category does the new product best fit?
                    </DialogContentText>

                    <FormControl style={{display: 'flex', marginBottom: '12px'}}>
                        <InputLabel id='crop-category-label'>Category</InputLabel>
                        <Select
                            labelId='crop-category-label'
                            name='category'
                            color='secondary'
                            required
                            onChange={this.handleChange}
                            value={category}
                            >
                            {menuItemsByOptions(optionsToObjects(categories))}
                        </Select>
                    </FormControl>

                    <DialogContentText className={classes.selectEmpty}>
                        What is the common wholesale unit of measurement in the United States?
                    </DialogContentText>

                    <FormControl style={{display: 'flex', marginBottom: '12px'}}>
                        <InputLabel id='crop-default-measurement-label'>Default Measurement</InputLabel>
                        <Select
                            labelId='crop-default-measurement-label'
                            name='default_measure'
                            color='secondary'
                            required
                            onChange={this.handleChange}
                            value={default_measure}
                            >
                            {menuItemsByOptions(optionsToObjects(measurementOptions))}
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={removeThirdModal} color='secondary'>
                        Cancel
                    </Button>
                    <GreenButton type='submit' color='secondary' text={'Add Crop'} />
                </DialogActions>
            </form>
        </>
    }
}

export default connect(null, {removeThirdModal, addCrop, displayWarning, hideToast})(NewCropForm)