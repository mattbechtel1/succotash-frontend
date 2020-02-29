import React from 'react'
import SaveButton from '../components/SaveButton'
import WarningToast from '../components/WarningToast'
import { FormControl, Select, MenuItem, FormHelperText, ThemeProvider, InputLabel, ListItem, Divider, ListItemText, ListItemIcon } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import SuccotashDatePicker from '../components/SuccotashDatePicker'
import { Edit as EditIcon, Eco as EcoIcon, Event as CalIcon } from '@material-ui/icons'
import { connect } from 'react-redux'
import { editStageDate, editStageStatus, changeCrop, displayWarning, displayThirdModal } from '../redux_files/actions'
import { constructDate } from '../helpers/dates'
import { datePickerOverride } from '../helpers/themeOverrides'
import { menuItemsByOptions } from '../helpers/conversions'

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
                        <MenuItem value='unused'><em>Unused</em></MenuItem>
                        <MenuItem value='tilled'>Tilled</MenuItem>
                        <MenuItem value='planted'>Planted</MenuItem>
                        <MenuItem value='growing'>Growing</MenuItem>
                        <MenuItem value='harvest'>Harvest</MenuItem>
                        <MenuItem value='barren'>Barren</MenuItem>
                    </Select>
                    <FormHelperText>Present Stage</FormHelperText>
                </FormControl>
            </ListItem>
            <Divider />
        
        <ThemeProvider theme={datePickerOverride}>

            {/* Display/Change Start Date */}
            <ListItem button>
                Stage Start Date: <SuccotashDatePicker className='vert-center-span'
                    value={constructDate(start_date)}
                    name='stage-start-date'
                    dateChangeAction={(date) => this.props.editStageDate('start_date', date)}
                    showToday
                />
            </ListItem>
            <Divider />

            {/* Display/Change End Date */}
            <ListItem button>
                Stage End Date: <SuccotashDatePicker className='vert-center-span'
                    value={constructDate(due_date)}
                    name='stage-end-date'
                    showToday
                    clearable
                    dateChangeAction={this.changeDueDate}
                    animateYearScrolling /> 
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