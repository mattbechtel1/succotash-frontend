import React from 'react'
import { connect } from 'react-redux'
import { Container, CircularProgress, Input, Drawer, Card, CardContent, List, ListItem, Divider, ListItemIcon, ListItemText, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BedTile from './BedTile'
import { unsetBed, setNewDate, openBedInput, saveBedName, closeBedInput, deleteField, displayModal, removeModal, displayWarning } from '../redux_files/actions'
import DateBar from './DateBar'
import SidebarForm from './SidebarForm'
import { Edit as EditIcon, Cancel as CancelIcon, ErrorOutline as AlertIcon, ArrowBack as BackIcon, DeleteForever as DeleteIcon } from '@material-ui/icons'
import { constructDate } from '../helpers/dates'
import WarningButton from '../components/WarningButton'
import TodoContainer from '../components/TodoContainer'

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
    },
    mainGrid: {
        marginTop: theme.spacing(3),
      },
    card: {
        display: 'inline-block',
        backgroundColor: theme.palette.primary.main
    },
}));



const FieldGrid = ({modal, history, field, toast, todos: {loading: tLoading}, loading, closeBedInput, removeModal, beds, displayModal, activeBed, unsetBed, setNewDate, deleteField, saveBedName, openBedInput, date, location, sidebar, displayWarning, match: {params: {slug}}}) => {
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
 
    // display while loading
    if (loading) {        
        return <Container>
            <DateBar />
            <CircularProgress color='primary' thickness={3} />
        </Container>
    
    // display if field is not matched from URL
    } else if (!field) {
        return <div>
                <Link to='/field/new' className='text-link'>
                    <Button variant="contained" style={{margin: '10px'}}>
                        ADD A NEW FIELD
                    </Button>
                </Link>
            </div>    
    // display if field is matched from URL
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
    
        return <Container style={{paddingTop: '10px'}}>
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

            <Grid container spacing={3} className={classes.mainGrid}>
                <Container>
                    <Card className={classes.card}>
                        <CardContent>
                            {tLoading ? <CircularProgress color='secondary' /> : <TodoContainer todos={field.todos} defaultField={field} />}
                        </CardContent>
                    </Card>
                </Container>
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

const mapStateToProps = ({fields, bed, date, sidebar, modal, toast, todos}, {match}) => {
    return {
        field: fields.fields.find(field => field.slug === match.params.slug),
        loading: fields.loading,
        beds: fields.fields.find(field => field.slug === match.params.slug) ? fields.fields.find(field => field.slug === match.params.slug).beds : [],
        activeBed: bed,
        date,
        sidebar,
        modal,
        todos,
        toast: toast.open
    }
}

export default withRouter(connect(mapStateToProps, {unsetBed, displayWarning, setNewDate, openBedInput, displayModal, closeBedInput, removeModal, saveBedName, deleteField})(FieldGrid))