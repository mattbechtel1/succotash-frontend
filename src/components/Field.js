import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Header, Dimmer, Loader, Sidebar, Segment, Menu, Icon, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import BedTile from './BedTile'
import { unsetBed } from '../redux_files/actions'
import DateBar from './DateBar'


const FieldGrid = ({field, loading, beds, activeBed, unsetBed, match: {params: {slug}}}) => {
    if (loading || !field) {
        const fieldName = slug.split('-').join(' ')
        
        return <Container>
            <DateBar />
            <Header as='h3'>{fieldName}</Header>
                <Loader>Loading...</Loader>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' /> */}
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
            visible={activeBed}
            width='thin'
            >
            <Menu.Item as='a'>
             <Header as='h5'>{activeBed ? activeBed.name : ''}</Header>
            </Menu.Item>
            <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
            </Menu.Item>
            <Menu.Item as='a' onClick={unsetBed}>
            <Icon name='camera' />
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

const mapStateToProps = ({fields, bed}, {match}) => {
    return {
        field: fields.fields.find(field => field.slug === match.params.slug),
        loading: fields.loading,
        beds: fields.fields.find(field => field.slug === match.params.slug) ? fields.fields.find(field => field.slug === match.params.slug).beds : [],
        activeBed: bed
    }
}

export default withRouter(connect(mapStateToProps, {unsetBed})(FieldGrid))