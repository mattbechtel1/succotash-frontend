import React from 'react'
import { connect } from 'react-redux'
import { Container, CircularProgress, Input, Drawer, List, ListItem, Divider, ListItemIcon, ListItemText, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import BedTile from '../components/BedTile'
import { unsetBed, setNewDate, openBedInput, updateBedName, deleteField, displayModal, removeModal } from '../redux_files/actions'
import DateBar from '../components/DateBar'
import SidebarForm from '../components/SidebarForm'
import { Edit as EditIcon, Cancel as CancelIcon, ErrorOutline as AlertIcon, ArrowBack as BackIcon, DeleteForever as DeleteIcon } from '@material-ui/icons'
import { dateUnformat } from '../helpers/dates'

const useStyles = makeStyles(theme => ({
    list: {
      width: 275,
    },
    fullList: {
      width: 'auto',
    },
    gridPad: {
        padding: theme.spacing(1),
    }
}));

const FieldGrid = ({modal, history, field, loading, beds, displayModal, activeBed, unsetBed, setNewDate, deleteField, updateBedName, openBedInput, date, location, sidebar, match: {params: {slug}}}) => {
    const classes = useStyles()
    const searchParams = new URLSearchParams(location.search)
    const datetime = searchParams.get('date')
    
    if (datetime) {
        const dateForDispatch = dateUnformat(datetime)
        if (dateForDispatch.getTime() !== date.getTime()) {
            setNewDate(dateForDispatch, slug, history)
        }
    }

    const handleButtonClick = () => {
        if (!loading) {displayModal()}
    }

    const confirmDelete = () => deleteField(field, history)

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
                    <Grid 
                        item
                        xs={Math.floor(12/x_axis_count)}
                        key={`${rowCounter}-${colCounter}`}
                    >
                        <BedTile className={classes.gridPad} bed={beds[bedCounter]} />
                    </Grid>
                )
                colCounter++
            }

            rows.push(
                <Grid
                    container
                    item
                    xs={12}
                    spacing={3}
                    key={`row-${rowCounter}`}
                >
                    {columns}
                </Grid>
            )
            rowCounter++
        }

    
        return <Container>
            <DateBar />
            <h3>{fieldName}</h3>

            <Grid
                container
                direction='row'
                spacing={1}
                justify='space-evenly'
                alignItems='center'  
            >
                {rows}
            </Grid>

            <div style={{padding: '10px'}}>
                <Button
                variant="contained"
                color="secondary"
                disabled={loading}
                onClick={handleButtonClick}
                >
                    DELETE THIS FIELD
                </Button>
            </div>

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
            
            {/* Confirmation for Delete Button Modal */}
            <Dialog open={modal} onClose={removeModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="alert-dialog-title"><AlertIcon />Are you sure you want to delete your field?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deleting a field is an irreversible action. Please confirm that you would like this 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={removeModal} color="primary" startIcon={<BackIcon />}>
                    Take me back!
                </Button>
                <Button onClick={confirmDelete} color="secondary" autoFocus startIcon={<DeleteIcon/>}>
                    Confirm Deletion
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    }
}

const mapStateToProps = ({fields, bed, date, sidebar, modal}, {match}) => {
    return {
        field: fields.fields.find(field => field.slug === match.params.slug),
        loading: fields.loading,
        beds: fields.fields.find(field => field.slug === match.params.slug) ? fields.fields.find(field => field.slug === match.params.slug).beds : [],
        activeBed: bed,
        date,
        sidebar,
        modal
    }
}

export default withRouter(connect(mapStateToProps, {unsetBed, setNewDate, openBedInput, displayModal, removeModal, updateBedName, deleteField})(FieldGrid))