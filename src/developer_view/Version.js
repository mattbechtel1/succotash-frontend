import React from 'react'

import {Typography, ListItem, List, ListItemText} from '@material-ui/core'

import {formatUSA} from '../helpers/dates'


const VersionNote = ({title, releaseDate, notes}) => {
    return <>
        <Typography variant='h6'>{title}: {formatUSA(releaseDate)}</Typography>
        <List>
            {notes.map(note => <ListItem dense key={note}>
                <ListItemText primary={note}/>
            </ListItem>)}
        </List>
    </>
}

export default VersionNote