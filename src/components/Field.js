import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Header, Dimmer, Loader, Sidebar, Segment, Menu, Icon, Input } from 'semantic-ui-react'
import {FormControl, Select, MenuItem, FormHelperText, Button} from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import { withRouter } from 'react-router-dom'
import BedTile from './BedTile'
import { unsetBed, setNewDate, openBedInput, updateBedName } from '../redux_files/actions'
import DateBar from './DateBar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }));

function dateUnformat(dashedDate) {
    let dateArray = dashedDate.split('-')

    if (dateArray[1] === 0) {
        dateArray[1] = 12
    } else {
        dateArray[1] = dateArray[1] - 1
    }

    return new Date(...dateArray)
}

const FieldGrid = ({field, loading, beds, activeBed, unsetBed, setNewDate, updateBedName, openBedInput, date, location, sidebar, match: {params: {slug}}}) => {
    const materialClasses = useStyles()
    let presentStage
    if (activeBed && date) {
        presentStage = activeBed.stages.find(stage => date.getTime() >= dateUnformat(stage.start_date).getTime() && (!stage.due_date || date.getTime() < dateUnformat(stage.due_date).getTime()))
    }

    const searchParams = new URLSearchParams(location.search)
    const datetime = searchParams.get('date')

    if (datetime) {
        const dateForDispatch = dateUnformat(datetime)
        if (dateForDispatch.getTime() !== date.getTime()) {
            setNewDate(dateForDispatch)
        }
    }

    if (loading || !field) {
        const fieldName = slug.split('-').join(' ')
        
        return <Container>
            <DateBar />
            <Header as='h3'>{fieldName}</Header>
                <Loader active>Loading...</Loader>
        </Container>
        
    } else {

        const {x_axis_count, y_axis_count, name: fieldName} = field
        let rows = []
        let rowCounter = 0

        while (rowCounter < y_axis_count) {
            let columns = []
            let colCounter = 0
            while (colCounter < x_axis_count) {
                let bedCounter = (rowCounter * x_axis_count) + colCounter
               
                columns.push(
                    <Grid.Column key={`${rowCounter}-${colCounter}`}>
                        <BedTile bed={beds[bedCounter]} />
                    </Grid.Column>)
                colCounter++
            }

            rows.push(<Grid.Row key={`row-${rowCounter}`} columns={x_axis_count}>{columns}</Grid.Row>)
            rowCounter++
        }
    
    return <Container>
        <DateBar />
        <Header as='h3'>{fieldName}</Header>

        <Sidebar.Pushable as={Segment}>
         <Sidebar
            as={Menu}
            animation='scale down'
            direction='right'
            icon='labeled'
            // onHide={unsetBed}
            vertical
            visible={!!activeBed}
            width='wide'
            >
            <Menu.Item as='a'>
                { sidebar.loadingTitle ? <Loader active /> : 
                <Header as='h5'>
                    { sidebar.titleInput ? 
                        <Input placeholder={activeBed.name} onBlur={(e) => updateBedName(activeBed.id, e.target.value)} />
                        :
                        <span>{activeBed ? activeBed.name : ''} <Icon name='pencil' onClick={openBedInput} /></span> }
                </Header>
                }
            </Menu.Item>
            
            {/* Display/change crop */}
            <Menu.Item as='a'>
                {activeBed ?
                <span>
                Crop: { presentStage && presentStage.tempCrop ? presentStage.tempCrop : 'No crop set' } <Icon name='pencil' onClick={() => console.log("This should open the crop selector option")} />
                </span>
                : <Loader active />
            }
            </Menu.Item>

            {/* Display/Change Status */}
            <Menu.Item>
                <FormControl>
                    <Select value={presentStage ? presentStage.status : 'unused'} onChange={console.log("This should change the current stage in state OR overwrite the current stage in state")} displayEmpty className={materialClasses.selectEmpty}>
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
                    Stage Start Date: {presentStage && presentStage.start_date ? 
                        <DatePicker 
                            value={presentStage.start_date}
                            onChange={() => console.log("This should change the start date in state OR overwrite the current stage in state")}
                            animateYearScrolling /> 
                        : 'None'}
                </span>
            </Menu.Item>

            {/* Display/Change End Date */}
            <Menu.Item as='a'>
                <span className='vert-center-span'>
                    Stage End Date: {presentStage && presentStage.due_date ? 
                        <DatePicker 
                            value={presentStage.due_date}
                            onChange={() => console.log("This should change the end date in state OR overwrite the current stage in state")}
                            animateYearScrolling /> 
                        : 'None'}
                </span>
            </Menu.Item>

                {/* SAVE BUTTON */}
            <Menu.Item>
                <Button variant='contained' color='secondary' onClick={() => console.log("If this were hooked up, you would have saved your changes.")}>SAVE CHANGES</Button>
            </Menu.Item>

            {/* Closed Bed without Persisting Changes to DB */}
            <Menu.Item as='a' onClick={unsetBed}>
                <Icon name='close' />
                Close Sidebar
            </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
            <Grid>{rows}</Grid>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
    </Container>
    }
}

const mapStateToProps = ({fields, bed, date, sidebar}, {match}) => {
    return {
        field: fields.fields.find(field => field.slug === match.params.slug),
        loading: fields.loading,
        beds: fields.fields.find(field => field.slug === match.params.slug) ? fields.fields.find(field => field.slug === match.params.slug).beds : [],
        activeBed: bed,
        date,
        sidebar
    }
}

export default withRouter(connect(mapStateToProps, {unsetBed, setNewDate, openBedInput, updateBedName})(FieldGrid))