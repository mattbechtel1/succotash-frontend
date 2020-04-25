import React from 'react'

import DeveloperHeader from './DeveloperHeader'
import Version from './Version'
import {Container, Grid, Paper, Typography, ListItem, ListItemText, List} from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles'

import {versions} from '../versions'

const useStyles = makeStyles(theme => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
    versionBox: {
        padding: theme.spacing(2),
        margin: '16px',
        backgroundColor: theme.palette.primary.light,
    },
    linkBox: {
        padding: theme.spacing(2),
        margin: '16px',
        backgroundColor: 'lightgray'
    },
    linkText: {
        padding: theme.spacing(1)
    }
}))

const GitLink = ({url, text}) => {
    const classes = useStyles()

    return <a href={url}
            target='_blank'
            className='text-link' 
            rel="noopener noreferrer">
        <ListItem button>
            <GitHubIcon /> <ListItemText primary={text} className={classes.linkText} />
        </ListItem>
    </a>
}

const DeveloperPage = () => {
    const classes = useStyles()

    return <Container maxWidth='lg'>
        <main style={{paddingTop: '10px'}}>
            <DeveloperHeader />
            
            <Grid 
                container
                alignItems='flex-start' 
                className={classes.mainGrid}>
                    
                    <Grid item 
                        md={7}
                        xs={12}
                    >
                        <Paper 
                            elevation={2}
                            className={classes.versionBox}>
                                <Typography variant='h4' gutterBottom>Version History</Typography>
                                {versions.map(({notes, release, title}) => <Version
                                    title={`Succotash ${title}`}
                                    releaseDate={release}
                                    notes={notes} 
                                    key={title}
                                />)}
                        </Paper>
                    </Grid>
                    
                    <Grid 
                        item 
                        md={5}
                        xs={12}>
                        <Paper
                            elevation={1}
                            className={classes.linkBox}>
                                <Typography variant='h5'>Github Repositories</Typography>
                                <List>
                                    <GitLink 
                                        url='https://github.com/mattbechtel1/succotash-frontend' 
                                        text='Succotash Frontend'
                                    />
                                    <GitLink
                                        url='https://github.com/mattbechtel1/succotash-backend'
                                        text='Succotash Backend'
                                    />
                                 </List>
                        </Paper>
                    </Grid>
            </Grid>
        </main>
    </Container>
}

export default DeveloperPage