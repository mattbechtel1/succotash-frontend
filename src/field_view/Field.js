import React from 'react'
import { connect } from 'react-redux'
import { Container, CircularProgress, Input, Drawer, List, ListItem, Divider, ListItemIcon, ListItemText, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BedTile from './BedTile'
import { unsetBed, setNewDate, openBedInput, saveBedName, closeBedInput, deleteField, displayModal, removeModal } from '../redux_files/actions'
import DateBar from './DateBar'
import SidebarForm from './SidebarForm'
import { Edit as EditIcon, Cancel as CancelIcon, ErrorOutline as AlertIcon, ArrowBack as BackIcon, DeleteForever as DeleteIcon } from '@material-ui/icons'
import { constructDate } from '../helpers/dates'
import WarningButton from '../components/WarningButton'

const useStyles = makeStyles(theme => ({
    list: {
      width: 275,
    },
    fullList: {
      width: 'auto',
    },
    gridPad: {
        padding: theme.spacing(1),
    },
    drawer: {
        background: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    }
}));



const FieldGrid = ({modal, history, field, loading, closeBedInput, removeModal, beds, displayModal, activeBed, unsetBed, setNewDate, deleteField, saveBedName, openBedInput, date, location, sidebar, match: {params: {slug}}}) => {
    const classes = useStyles()
    const searchParams = new URLSearchParams(location.search)
    const datetime = searchParams.get('date')
    
    if (datetime) {
        const dateForDispatch = constructDate(datetime)
        if (dateForDispatch.getTime() !== date.getTime()) {
            setNewDate(dateForDispatch, slug, history)
        }
    }

    const handleButtonClick = () => {
        if (!loading) {displayModal()}
    }

    const confirmDelete = () => {
        removeModal()
        deleteField(field, history)
    }

    const blurBedInput = (e) => {
        if (e.target.value) {
            saveBedName(activeBed, e.target.value, date)
        } else {
            closeBedInput()
        }
    }
 
    if (loading || !field) {        
        return <Container>
            <DateBar />
            <CircularProgress color='secondary' thickness={3} />
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
                        xs={Math.min(Math.floor(12/x_axis_count), 4)}
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
            <h1 className='brown-text'>{fieldName}</h1>

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
                <WarningButton
                variant="contained"
                disabled={loading}
                onClick={handleButtonClick}
                >
                    DELETE THIS FIELD
                </WarningButton>
            </div>

            <Drawer anchor='right' open={!!activeBed} onClose={unsetBed} classes={{paper: classes.drawer}}>
                <div className={classes.list} role='presentation'>
                    <List>
                        <ListItem button onClick={openBedInput} style={{position: 'relative'}}>
                            { sidebar.loadingTitle ? 
                                <CircularProgress style={{marginLeft: '50%'}} color='secondary'/>
                            : 
                                <>
                                    { sidebar.titleInput && activeBed ? 
                                        <Input placeholder={activeBed.name} onBlur={blurBedInput} /> 
                                    :
                                        <>
                                            <ListItemIcon><EditIcon /></ListItemIcon>
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
                    Deleting a field is an irreversible action. Please confirm that you would like to remove this field. 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={removeModal} color="secondary" startIcon={<BackIcon />}>
                    Take me back!
                </Button>
                <WarningButton onClick={confirmDelete} autoFocus startIcon={<DeleteIcon/>}>
                    Confirm Deletion
                </WarningButton>
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

export default withRouter(connect(mapStateToProps, {unsetBed, setNewDate, openBedInput, displayModal, closeBedInput, removeModal, saveBedName, deleteField})(FieldGrid))