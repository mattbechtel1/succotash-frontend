import React from 'react'
import { connect } from 'react-redux'
import { Container, CircularProgress, Input, Backdrop, Drawer, Card, CardContent, List, ListItem, Divider, ListItemIcon, ListItemText, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BedTile from './BedTile'
import NewCropForm from './NewCropForm'
import DateBar from './DateBar'
import SidebarForm from './SidebarForm'
import { unsetBed, setNewDate, openBedInput, saveBedName, closeBedInput, deleteField, displayModal, displayFourthModal, removeModal, removeFourthModal, displayWarning, removeThirdModal , hideToast, editFieldName, editFieldPic} from '../redux_files/actions'
import { Edit as EditIcon, Cancel as CancelIcon, ErrorOutline as AlertIcon, ArrowBack as BackIcon, DeleteForever as DeleteIcon } from '@material-ui/icons'
import { constructDate } from '../helpers/dates'
import {WarningButton, GreenButton} from '../components/Buttons'
import TodoContainer from '../components/TodoContainer'
import EditFieldForm from './EditFieldForm'
import WarningToast from '../components/WarningToast'

const useStyles = makeStyles(theme => ({
    list: {
      width: 275,
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
        backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(1),
    },
    titleCard: {
        display: 'inline-block',
        backgroundColor: theme.palette.primary.dark,
        margin: theme.spacing(1),
        paddingBottom: theme.spacing(0)
    },
    button: {
        margin: theme.spacing(1),
        flexShrink: 0,    
    }
}));

const FieldGrid = ({modal, modal3, modal4, history, field, todos: {todos}, loading, closeBedInput, removeModal, removeFourthModal, beds, displayModal, displayFourthModal, activeBed, unsetBed, setNewDate, deleteField, saveBedName, openBedInput, date, location, sidebar, removeThirdModal, editFieldName, editFieldPic, match: {params: {slug}}}) => {
    const classes = useStyles()
    const searchParams = new URLSearchParams(location.search)
    const datetime = searchParams.get('date')
    
    if (datetime) {
        const dateForDispatch = constructDate(datetime)
        if (dateForDispatch.getTime() !== date.getTime()) {
            setNewDate(dateForDispatch, slug, history)
        }
    }

    const handleButtonClick = (modalCallback) => {
        if (!loading) {modalCallback()}
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
        return <Container><DateBar /></Container>
    
    // display if no field is matched from URL
    } else if (!field) {
        return <>
            <Container><DateBar /></Container>
            <Backdrop style={{zIndex: 1}} open={loading || !field}>
                <CircularProgress color="primary" />
            </Backdrop>
        </>

    // display if field is matched from URL
    } else {
        const {x_axis_count, y_axis_count, name: fieldName} = field


        // const bedTotal = x_axis_count * y_axis_count
        // let bedCounter = 0
        // const rows = []

        // while (bedCounter < bedTotal) {
        //     rows.push(
        //         <Grid 
        //             item
        //             xs={Math.floor(12/x_axis_count)}
        //             key={`bed-${bedCounter + 1}`}
        //         >
        //             <BedTile bed={beds[bedCounter]} />
        //         </Grid>
        //     )
        //     bedCounter++
        // }


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
                        md={Math.min(Math.floor(12/x_axis_count), 4)}
                        xs={6}
                        key={`bed-${bedCounter}`}
                    >
                        <BedTile className={classes.gridPad} bed={beds[bedCounter]} />
                    </Grid>
                )
                colCounter++
            }

            rows.push(
                <Grid
                    container
                    spacing={3}
                    key={`row-${rowCounter}`}
                >
                    {columns}
                </Grid>
            )
            rowCounter++
        }
    
        return <Container style={{paddingTop: '10px'}}>
            <WarningToast />
            <DateBar />
           
            <div>
            <Card className={classes.titleCard}>
                <CardContent>
                    <Typography variant='h4'>{fieldName}</Typography>
                </CardContent>
            </Card>
            </div>

            <Grid
                container
                // direction='row'
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
                            <TodoContainer todos={todos.filter(todo => todo.field_id === field.id)} defaultField={field} />
                        </CardContent>
                    </Card>
                </Container>
            </Grid>


            <div style={{padding: '10px'}}>
                <Button
                    className={classes.button}
                    variant='contained'
                    disabled={loading}  
                    color='secondary'
                    onClick={() => handleButtonClick(
                        () => {
                            editFieldName(fieldName)
                            editFieldPic(field.pic_opt)
                            displayFourthModal()
                        }
                    )}  
                >   
                    EDIT THIS FIELD
                </Button>

                <WarningButton
                    className={classes.button}
                    variant="contained"
                    disabled={loading}
                    onClick={() => handleButtonClick(displayModal)}
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
                    <GreenButton callback={removeModal} text={<><BackIcon />Take me back!</>} />
                    <WarningButton onClick={confirmDelete} autoFocus startIcon={<DeleteIcon/>}>
                        Confirm Deletion
                    </WarningButton>
                </DialogActions>
            </Dialog>

            <Dialog open={modal4} onClose={removeFourthModal} aria-labelledby='form-dialog-title'>
                <EditFieldForm field={field}/>
            </Dialog>

            <Dialog open={modal3} onClose={removeThirdModal} aria-labelledby='form-dialog-title'>
                <NewCropForm />
            </Dialog>

        </Container>
    }
}

const mapStateToProps = ({fields, bed, date, sidebar, modal, modal4, modal3, todos}, {match}) => {
    return {
        field: fields.fields.find(field => field.slug === match.params.slug),
        loading: fields.loading,
        beds: fields.fields.find(field => field.slug === match.params.slug) ? fields.fields.find(field => field.slug === match.params.slug).beds : [],
        activeBed: bed,
        date,
        sidebar,
        modal,
        modal3,
        modal4,
        todos
    }
}

export default withRouter(connect(mapStateToProps, {unsetBed, displayWarning, setNewDate, openBedInput, displayModal, displayFourthModal, closeBedInput, removeModal, removeThirdModal, removeFourthModal, saveBedName, deleteField, hideToast, editFieldName, editFieldPic})(FieldGrid))