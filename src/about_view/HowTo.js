import React from 'react'

import HowToHeader from './HowToHeader'
import {Container, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Step from './Step'

import step1 from '../assets/how-to-animations/step1animation.gif'
import step2 from '../assets/how-to-animations/step2animation.gif'
import step3 from '../assets/how-to-animations/step3animation.gif'
import step4 from '../assets/how-to-animations/step4animation.gif'
import step5 from '../assets/how-to-animations/step5animation.gif'


const useStyles = makeStyles(theme => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    }
}))

const steps = [
    { 
        title: 'Step 1: Sign Up', 
        gif: step1, 
        paragraph: "In order to start using Succotash, first sign up! Don't worry, we won't send you marketing spam, but to save your farms' and gardens' information, we will need you to create an account." 
    }, { 
        title: 'Step 2: Add Your Farm',
        gif: step2,
        paragraph: "Give your farm or field a name, determine how many subdivisions you want to be able to see and edit on this farm, and start planting!"
    }, {
        title: 'Step 3: Choose Your Crop and Cycle',
        gif: step3,
        paragraph: 'For each subdivision, you can set up a crop cycle stage and choose an associated crop. You can save new stages for different dates, or overwrite other saved stages.'
    }, {
        title: 'Step 4: Browse Your Farm by Date',
        gif: step4,
        paragraph: 'Use the calendar show at the top of the page to view your field on a specific date and more easily access a stage to edit.'
    }, {
        title: 'Step 5: Create Your To-do List',
        gif: step5,
        paragraph: "Succotash's deadline tracker feature allows you to set, keep track of, and meet deadlines. When you complete a task, you can either mark it as complete or delete it from your list altogether."
    }
]

const HowToPage = () => {
    const classes = useStyles()
    const alternator = ['right', 'left']

    return <Container maxWidth='lg'>
        <main style={{paddingTop: '10px'}}>
            <HowToHeader />
            <Grid container spacing={5} className={classes.mainGrid}>
                {steps.map((step, index) => <Step 
                    imagePosition={alternator[index%2]} 
                    title={step.title} 
                    image={step.gif} 
                    text={step.paragraph} 
                    key={step.title}
                />)}
            </Grid>
        </main>
    </Container>
}

export default HowToPage