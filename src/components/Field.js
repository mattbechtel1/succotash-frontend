import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Header, Dimmer, Loader, Sidebar, Segment, Menu, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import BedTile from './BedTile'
import { unsetBed, setNewDate, openBedInput, updateBedName } from '../redux_files/actions'
import DateBar from './DateBar'
import SidebarForm from './SidebarForm'
import { Edit as EditIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { dateUnformat } from '../helpers/dates'

const FieldGrid = ({field, loading, beds, activeBed, unsetBed, setNewDate, updateBedName, openBedInput, date, location, sidebar, match: {params: {slug}}}) => {
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

        <Sidebar.Pushable as={Segment} className='background-field'>
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
                        <Input placeholder={activeBed.name} onBlur={(e) => updateBedName(activeBed.id, e.target.value, date)} />
                        :
                        <span>{activeBed ? activeBed.name : ''} <EditIcon name='pencil' onClick={openBedInput} /></span> }
                </Header>
                }
            </Menu.Item>

            {activeBed ? <SidebarForm /> : <Loader active>Loading...</Loader>}

            {/* Close Bed without Persisting Changes to DB */}
            <Menu.Item as='a' onClick={unsetBed}>
                <span className='vert-center-span'><CancelIcon name='close' /> Close Sidebar</span>
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