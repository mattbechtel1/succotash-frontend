import React from 'react'
import SaveButton from '../components/SaveButton'
import WarningToast from '../components/WarningToast'
import { FormControl, Select, MenuItem, FormHelperText, ThemeProvider, InputLabel, ListItem, Divider, ListItemText, ListItemIcon } from '@material-ui/core'
import SuccotashDatePicker from '../components/SuccotashDatePicker'
import { Edit as EditIcon, Eco as EcoIcon, Event as CalIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
import { editStageDate, editStageStatus, changeCrop, displayWarning, displayThirdModal } from '../redux_files/actions'
import { constructDate } from '../helpers/dates'
import { datePickerOverride } from '../helpers/themeOverrides'
import { menuItemsByOptions, capitalize } from '../helpers/conversions'

class SidebarForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cropWriter: false,
            // newCropWriter: false
        }
    }

    openCropWriter = () => {
        this.setState({cropWriter: true})
    }

    closeCropWriter = () => {
        this.setState({cropWriter: false})
    }

    cropById = (id) => {
        return this.props.crops.find(crop => crop.id === id)
    }

    changeDueDate = (date) => {
        if (!date || date.getTime() >= new Date(this.props.stage.start_date).getTime()) {
            this.props.editStageDate('due_date', date)
        } else {
            this.props.displayWarning("Due date must occur after the start date.")
        }
    }

    changeCrop = (e) => {
        if (e.target.value === 'unknown') {
            this.props.displayThirdModal()
        } else {
            this.props.changeCrop(this.cropById(e.target.value))
        }
    }


    render() {
        const {cropWriter} = this.state
        const {start_date, due_date, status, crop } = this.props.stage
        const cropOptions = this.props.crops.map(crop => (
            { key: crop.id, value: crop.id, text: crop.name}
        ))

        const stageOptions = ['unused', 'tilled', 'planted', 'growing', 'harvest', 'barren']
        const stageOptionsObjs = stageOptions.map(opt => ({value: opt, key: opt, text: capitalize(opt)}))

        return <>
            <WarningToast />

            {/* Display/change crop */}
            <ListItem button onClick={this.openCropWriter}>
                <span className='vert-center-span'>
                <ListItemIcon><EditIcon /></ListItemIcon>
                {cropWriter ?
                    <FormControl>
                        <InputLabel id="crop-select-label">Crop</InputLabel>
                        <Select
                            labelId='crop-select-label'
                            name='crop'
                            value={crop ? crop.id : ''}
                            onChange={this.changeCrop}
                            onBlur={this.closeCropWriter}
                        >
                            {menuItemsByOptions(cropOptions)}
                            <MenuItem value={'unknown'}>Add a New Option</MenuItem>
                        </Select>
                    </FormControl>

                : 
                    <ListItemText primary={crop ? 'Crop: ' + crop.name : 'Crop: No crop set'} />
                }
                </span>
            </ListItem>
            < Divider />

            {/* Display/Change Status */}
            <ListItem button>
                <ListItemIcon><EcoIcon /></ListItemIcon>
                <FormControl style={{display: 'flex'}}>
                    <Select value={status} onChange={(e) => this.props.editStageStatus(e.target.value)} displayEmpty>
                        {menuItemsByOptions(stageOptionsObjs)}
                    </Select>
                    <FormHelperText>Present Stage</FormHelperText>
                </FormControl>
            </ListItem>
            <Divider />
        
        <ThemeProvider theme={datePickerOverride}>

            {/* Display/Change Start Date */}
                <ListItem button>
                    <span className='vert-center-span'>
                        <ListItemIcon><CalIcon /></ListItemIcon>
                        Stage Start Date: <SuccotashDatePicker 
                            value={constructDate(start_date)}
                            name='stage-start-date'
                            dateChangeAction={(date) => this.props.editStageDate('start_date', date)}
                            excludeIcon
                            showToday
                        />
                    </span>
                </ListItem>
            <Divider />

            {/* Display/Change End Date */}
            <ListItem button>
                <span className='vert-center-span'>
                    <ListItemIcon><CalIcon /></ListItemIcon>
                    Stage End Date: <SuccotashDatePicker
                        value={constructDate(due_date)}
                        name='stage-end-date'
                        showToday
                        clearable
                        excludeIcon
                        dateChangeAction={this.changeDueDate}
                        animateYearScrolling /> 
                </span>
            </ListItem>
        </ThemeProvider>
            <Divider />

            {/* SAVE BUTTON */}
            <ListItem button className='center-list-item-33'>
                <SaveButton />
            </ListItem>
        </>
    }
}

export default connect(({stage, sidebar, crops}) => ({stage, sidebar, crops}), { editStageDate, displayWarning, editStageStatus, changeCrop, displayThirdModal})(SidebarForm)