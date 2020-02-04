import React from 'react'
import { connect } from 'react-redux'
import { setNewDate, setBed } from '../redux_files/actions'
import { DatePicker } from '@material-ui/pickers'
import { Container } from '@material-ui/core'
import { withRouter } from 'react-router-dom'


const CalendarBar = ({date, slug, bed, setBed, setNewDate}) => {
    const handleChange = (date) => {
        setNewDate(date, slug)
        
        if (bed) {
            setBed(bed, date)
        }
    } 

    return (
        <Container>
            <DatePicker 
                value={date}
                minDate={'2015-01-01'}
                onChange={d => handleChange(d)}
                animateYearScrolling /> 
        </Container>
    )
}
const mapStateToProps = ({date, bed}, {match}) => ({date, bed, slug: match.params.slug})

const mapDispatchToProps = (dispatch, {history}) => {
    return { 
        setNewDate: (date, slug) => dispatch(setNewDate(date, slug, history)),
        setBed: (bed, date) => dispatch(setBed(bed, date))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarBar))