import React from 'react'
import { constructDate } from './dates'
import { MenuItem } from '@material-ui/core'

export function convertBedToCurrentStage(bed, date) {
    return bed.stages.find(stage => date.getTime() >= constructDate(stage.start_date).getTime() && (!stage.due_date || date.getTime() <= constructDate(stage.due_date).getTime()))
}

export function capitalize(string) {
    if (string) {
        return string[0].toUpperCase() + string.slice(1)
    } else {
        return ''
    }
}

export function menuItemsByOptions(options) {
    return options.map(option => <MenuItem value={option.value} key={option.key}>{option.text}</MenuItem>)
}

export function sortAlphabetically(list) {
    return list.sort((a,b) => a.name > b.name ? 1 : -1)
}

export function sortCropNameAlphabetically(favList) {
    return favList.sort((a,b) => a.crop.name > b.crop.name ? 1 : -1)
}

export function topOfPage() {
    window.scrollTo({behavior: 'smooth', left: 0, top: 0})
}