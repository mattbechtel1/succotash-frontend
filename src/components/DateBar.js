import React from 'react'
import { connect } from 'react-redux'
import { setNewDate } from '../redux_files/actions'
import { DatePicker } from '@material-ui/pickers'
import { Container } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'


const CalendarBar = ({date, slug, setNewDate}) => {
    return (
        <Container>
            <DatePicker 
                value={date}
                onChange={d => setNewDate(d, slug)}
                animateYearScrolling /> 
        </Container>
    )
}
const mapStateToProps = ({date}, {match}) => ({date, slug: match.params.slug})

export default withRouter(connect(mapStateToProps, {setNewDate})(CalendarBar))