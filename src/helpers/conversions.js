import React from 'react'
import { constructDate } from './dates'
import { MenuItem } from '@material-ui/core'

export function convertBedToCurrentStage(bed, date) {
    return bed.stages.find(stage => date.getTime() >= constructDate(stage.start_date).getTime() && (!stage.due_date || date.getTime() <= constructDate(stage.due_date).getTime()))
}

export function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
}

export function menuItemsByOptions(options) {
    return options.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)
}