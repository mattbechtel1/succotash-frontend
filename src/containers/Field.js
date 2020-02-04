import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { Container, CircularProgress, Input, Drawer, List, ListItem, Divider, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import BedTile from '../components/BedTile'
import { unsetBed, setNewDate, openBedInput, updateBedName } from '../redux_files/actions'
import DateBar from '../components/DateBar'
import SidebarForm from '../components/SidebarForm'
import { Edit as EditIcon, Cancel as CancelIcon } from '@material-ui/icons'
import { dateUnformat } from '../helpers/dates'

const useStyles = makeStyles({
    list: {
      width: 275,
    },
    fullList: {
      width: 'auto',
    }
});

const FieldGrid = ({history, field, loading, beds, activeBed, unsetBed, setNewDate, updateBedName, openBedInput, date, location, sidebar, match: {params: {slug}}}) => {
    const classes = useStyles()
    const searchParams = new URLSearchParams(location.search)
    const datetime = searchParams.get('date')
    
    if (datetime) {
        const dateForDispatch = dateUnformat(datetime)
        if (dateForDispatch.getTime() !== date.getTime()) {
            setNewDate(dateForDispatch, slug, history)
        }
    }

    if (loading || !field) {
        const fieldName = slug.split('-').join(' ')
        
        return <Container>
            <DateBar />
            <h3>{fieldName}</h3>
                <CircularProgress color='primary' thickness={3} />
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
        <h3>{fieldName}</h3>

        <Grid>{rows}</Grid>

        <Drawer anchor='right' open={!!activeBed} onClose={unsetBed}>
            <div className={classes.list} role='presentation'>
                <List>
                    <ListItem button>
                        { sidebar.loadingTitle ? 
                            <CircularProgress />
                        : 
                            <>
                                { sidebar.titleInput ? 
                                    <Input placeholder={activeBed.name} onBlur={(e) => updateBedName(activeBed.id, e.target.value, date)} /> 
                                :
                                    <>
                                        <ListItemIcon onClick={openBedInput}><EditIcon /></ListItemIcon>
                                        <strong><ListItemText primary={activeBed ? activeBed.name : ''} /></strong>
                                    </>
                                }
                            </>
                        }
                    </ListItem>
                    <Divider />
                    {activeBed ? <SidebarForm /> : <ListItem button><CircularProgress color='primary' thickness={3} /></ListItem> }
                    <Divider />
                    {/* Close Bed without Persisting Changes to DB */}
                    <ListItem button onClick={unsetBed}>
                        <ListItemIcon><CancelIcon /></ListItemIcon>
                        <ListItemText primary='Close Sidebar' />
                    </ListItem>
                </List>
            </div>
        </Drawer>
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