import React from 'react'
import SaveButton from './SaveButton'
import { FormControl, Select, MenuItem, FormHelperText, Input, Snackbar, Slide } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers'
import { Edit as EditIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { editStageDate, editStageStatus, changeCrop, invalidTimeRange, removeTimeMessage } from '../redux_files/actions'
import { constructDate } from '../helpers/dates'

class SidebarForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cropWriter: false,
        }
    }

    useStyles = makeStyles(theme => ({
        selectEmpty: {
            marginTop: theme.spacing(2),
        }
    }))

    toggleCropWriter = () => {
        this.setState({cropWriter: !this.state.cropWriter})
    }

    changeDueDate = (date) => {
        if (date.getTime() >= new Date(this.props.stage.start_date).getTime()) {
            this.props.editStageDate('due_date', date)
        } else {
            this.props.invalidTimeRange()
        }
    }

    render() {
        const materialClasses = this.useStyles
        const {cropWriter} = this.state
        const {start_date, due_date, status, tempCrop: crop } = this.props.stage
        const { sidebar } = this.props

        function SlideTransition(props) {
            return <Slide {...props} directon='right' />
        }

        return <>
            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                TransitionComponent={SlideTransition}
                open={sidebar.timeRangeWarning}
                onClose={this.props.removeTimeMessage}
            >
                <Alert variant='filled' severity='error'>The end date cannot occur prior to the start date.</Alert> 
            </Snackbar>

            {/* Display/change crop */}
            <Menu.Item as='a'>
                <span className='vert-center-span'>
                {cropWriter ? 
                    <Input value={crop || ''} 
                        placeholder='Crop for this stage' 
                        onChange={(e) => this.props.changeCrop(e.target.value)} 
                        variant='filled' 
                        onBlur={this.toggleCropWriter} />
                : 
                    <>
                        Crop: { crop ? crop : 'No crop set' } <EditIcon onClick={this.toggleCropWriter} />
                    </>
                }
                </span>
            </Menu.Item>

            {/* Display/Change Status */}
            <Menu.Item>
                <FormControl>
                    <Select value={status} onChange={(e) => this.props.editStageStatus(e.target.value)} displayEmpty className={materialClasses.selectEmpty}>
                        <MenuItem value='unused'><em>Unused</em></MenuItem>
                        <MenuItem value='tilled'>Tilled</MenuItem>
                        <MenuItem value='planted'>Planted</MenuItem>
                        <MenuItem value='growth'>Growth</MenuItem>
                        <MenuItem value='harvest'>Harvest</MenuItem>
                        <MenuItem value='barren'>Barren</MenuItem>
                    </Select>
                    <FormHelperText>Present Stage</FormHelperText>
                </FormControl>
            </Menu.Item>

            {/* Display/Change Start Date */}
            <Menu.Item as='a'>
                <span className='vert-center-span'>
                    Stage Start Date:
                        <DatePicker 
                            value={constructDate(start_date)}
                            onChange={(date) => this.props.editStageDate('start_date', date)}
                            animateYearScrolling /> 
                </span>
            </Menu.Item>

            {/* Display/Change End Date */}
            <Menu.Item as='a'>
                <span className='vert-center-span'>
                    Stage End Date:
                        <DatePicker 
                            value={constructDate(due_date)}
                            onChange={this.changeDueDate}
                            animateYearScrolling /> 
                </span>
            </Menu.Item>

            {/* SAVE BUTTON */}
            <Menu.Item as='a'>
                <SaveButton />
            </Menu.Item>
        </>
    }
}

const mapStateToProps = ({stage, sidebar}) => ({stage, sidebar})

export default connect(mapStateToProps, { editStageDate, editStageStatus, removeTimeMessage, changeCrop, invalidTimeRange})(SidebarForm)