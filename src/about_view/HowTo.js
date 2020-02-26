import React from 'react'
import AboutHeader from '../about_view/AboutHeader'
import {Container, Grid, Paper, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import step1 from '../assets/how-to-animations/step1animation.gif'


const useStyles = makeStyles(theme => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
    sidebarAboutBox: {
        padding: theme.spacing(2),
        margin: '16px',
        backgroundColor: theme.palette.primary.light,
      },
    sidebarImageBox: {
        padding: theme.spacing(2),
        margin: '16px',
        backgroundColor: theme.palette.secondary.light
    }
}))

const steps = [
    { 
        title: 'Step 1: Sign Up', 
        gif: step1, 
        paragraph: "In order to start using Succotash, first sign up! Don't worry, we won't send you marketing spam, but to save your farms' and gardens' information, we will need you to create an account." 
    }, { 
        title: 'Step 2: Add Your Farm',
        gif: null,
        paragraph: "Lorem ipsum"
    }, {
        title: 'Step 3: Choose Your Crop and Cycle',
        gif: null,
        paragraph: 'Lorem ipsum'
    }, {
        title: 'Step 4: Browse Your Farm by Date',
        gif: null,
        paragraph: 'Lorem ipsum'
    }, {
        title: 'Step 5: Create Your To-do List',
        gif: null,
        paragraph: 'Lorem ipsum'
    }
]

const HowToPage = () => {
    const classes = useStyles()

    return <>
        <Container maxWdith='lg'>
            <main style={{paddingTop: '10px'}}>
                <AboutHeader />

                    <Grid container spacing={5} className={classes.mainGrid}>
                        {/* <Grid container spacing={10} style={{marginBottom: '1px', marginTop: '1px'}}> */}
                        
                        <Grid item xs={7}>
                            <Link to='/signup' className='text-link'>
                                <Paper elevation={0} className={classes.sidebarAboutBox}>

                                    <Typography variant='h6' gutterBottom>
                                        Step 1: Sign Up
                                    </Typography>
                                    <Typography variant='subtitle1' color='inherit' paragraph>
                                        In order to start using Succotash, first sign up! Don't worry, we won't send you marketing spam, but to save your farms' and gardens' information, we will need you to create an account.
                                    </Typography>
                                </Paper>
                            </Link>
                        </Grid>

                        <Grid item xs={5}>
                            <Paper elevation={0} className={classes.sidebarImageBox}>
                                <Image
                                    src={step1}
                                    disableSpinner
                                    aspectRatio={(16/9)}
                                    />
                            </Paper>
                        </Grid>

                    </Grid>

            </main>
        </Container>
    </>
}

export default HowToPage