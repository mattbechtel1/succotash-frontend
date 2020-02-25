import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import { setNewDate, setBed } from '../redux_files/actions'
import SuccotashDatePicker from '../components/SuccotashDatePicker'
import { Paper, makeStyles } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    paper: {
        display: 'inline-block',
        backgroundColor: theme.palette.primary.light
    }
}))

const CalendarBar = ({date, slug, bed, setBed, setNewDate}) => {
    const classes = useStyles()

    const handleChange = (date) => {
        setNewDate(date, slug)
        
        if (bed) {
            setBed(bed, date)
        }
    } 
    
    return <Paper elevation={3} className={classes.paper}>
        <SuccotashDatePicker 
            value={date}
            name='field_date'
            dateChangeAction={handleChange}
            showToday
        />
    </Paper>
}

const mapDispatchToProps = (dispatch, {history}) => {
    return { 
        setNewDate: (date, slug) => dispatch(setNewDate(date, slug, history)),
        setBed: (bed, date) => dispatch(setBed(bed, date))
    }
}

export default withRouter(connect(({date, bed}, {match}) => ({date, bed, slug: match.params.slug}), mapDispatchToProps)(CalendarBar))