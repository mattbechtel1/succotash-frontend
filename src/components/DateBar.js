import React from 'react'
import { connect } from 'react-redux'
import { tomorrow, nextWeek, yesterday, lastWeek, setNewDate } from '../redux_files/actions'
import Calendar from 'react-calendar'
import { Container, Button, Icon, Grid } from 'semantic-ui-react'

const CalendarBar = ({date, setNewDate, tomorrow, yesterday, lastWeek, nextWeek}) => {

    return (
        <Container>
            <Grid>
                <Grid.Column width='5'>
                    <Button icon onClick={lastWeek}>
                        <Icon name='angle double left' />
                    </Button>
                    <Button icon onClick={yesterday}>
                        <Icon name='angle left' />
                    </Button>
                </ Grid.Column>
                <Grid.Column width='6' >
                    <Calendar 
                        className='center'
                        value={date}
                        onChange={setNewDate}
                        />
                </Grid.Column>
                <Grid.Column width='5'>
                    <Button icon onClick={tomorrow}>
                        <Icon name='angle right' />
                    </Button>
                    <Button icon onClick={nextWeek}>
                        <Icon name='angle double right' />
                    </Button>
                </Grid.Column>
            </Grid>
        </Container>
    )
}
const mapStateToProps = ({date}) => ({date})

export default connect(mapStateToProps, {tomorrow, nextWeek, yesterday, lastWeek, setNewDate})(CalendarBar)