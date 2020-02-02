import React from 'react'
import { FormControl, Select, MenuItem, FormHelperText, Button, Input, Snackbar, Slide } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers'
import { Edit as EditIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveStage, editStageDate, editStageStatus, saveReset, changeCrop, invalidTimeRange, removeTimeMessage } from '../redux_files/actions'

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

        function SlideTransition(props) {
            return <Slide {...props} directon='right' />
        }

        return <>
            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                TransitionComponent={SlideTransition}
                open={this.props.sidebar.timeRangeWarning}
                onClose={this.props.removeTimeMessage}
            >
                <Alert variant='filled' severity='error'>The end date cannot occur prior to the start date.</Alert> 
            </Snackbar>

            <Snackbar 
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                TransitionComponent={SlideTransition}
                open={this.props.sidebar.successMessage}
                onClose={this.props.saveReset}
            >
                <Alert variant='filled' severity='success'>Successfully Saved!</Alert> 
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
                    <Select name='startDate' value={status} onChange={(e) => this.props.editStageStatus(e.target.value)} displayEmpty className={materialClasses.selectEmpty}>
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
                            value={start_date}
                            onChange={(date) => this.props.editStageDate('start_date', date)}
                            animateYearScrolling /> 
                </span>
            </Menu.Item>

            {/* Display/Change End Date */}
            <Menu.Item as='a'>
                <span className='vert-center-span'>
                    Stage End Date:
                        <DatePicker 
                            value={due_date}
                            onChange={this.changeDueDate}
                            animateYearScrolling /> 
                </span>
            </Menu.Item>

                {/* SAVE BUTTON */}
            <Menu.Item>
                <Button variant='contained' 
                    color='secondary' 
                    onClick={() => this.props.saveStage(this.props.stage, this.props.date)}>
                    SAVE CHANGES
                </Button>
            </Menu.Item>
        </>
    }
}

const mapStateToProps = ({stage, date, sidebar}) => ({stage, date, sidebar})

export default connect(mapStateToProps, {saveStage, saveReset, editStageDate, editStageStatus, removeTimeMessage, changeCrop, invalidTimeRange})(SidebarForm)