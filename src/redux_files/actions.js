import {constructDate, dateFormatter} from '../helpers/dates'

export function setNewDate(date, urlSlug, history) {
    return (dispatch) => {
        dispatch({type: 'SET_DATE', date})
        history.push(`/field/${urlSlug}?=${dateFormatter(date)}`)
    }
}

export function fetchFields() {
    return (dispatch) => {
        dispatch({type: 'LOADING_FIELDS'})
        fetch('http://localhost:2020/fields')
        .then(response => response.json())
        .then(data => {
            dispatch({type: 'SEED_FIELDS', fields: data})
        })
    }
}

export function setBed(bed, date) {
    return {type: 'SET_BED', bed, date}
}

export function unsetBed() {
    return {type: 'UNSET_BED'}
}

export function openBedInput() {
    return {type: 'EDIT_BED_TITLE'}
}

export function updateBedName(bedId, newName, date) {
    return (dispatch) => {
        dispatch({type: 'UPDATING_BED'})
        fetch('http://localhost:2020/beds/' + bedId, {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newName
            })
        })
        .then(response => response.json())
        .then(updatedBed => {
            dispatch({type: 'REPLACE_SINGLE_BED', bed: updatedBed})
            dispatch({type: 'SET_BED', bed: updatedBed, date})
        })
    }
}

export function editStageDate(dateType, date) {
    return {type: 'EDIT_STAGE_DATE', dateType, date}
}

export function editStageStatus(status) {
    return {type: 'EDIT_STAGE_STATUS', status}
}

export function changeCrop(crop) {
    return {type: 'EDIT_TEMP_CROP', crop}
}

export function saveStage(stage, date) {
    const start_date = constructDate(stage.start_date)
    const due_date = constructDate(stage.due_date)
    
    if (start_date && (!due_date || start_date < due_date)) {
        return (dispatch) => {
            dispatch({type: 'UPDATING_BED'})
            dispatch({type: 'SAVING_STAGE'})
            fetch('http://localhost:2020/stages/', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: stage.status,
                    bed_id: stage.bed_id,
                    start_date: stage.start_date,
                    due_date: stage.due_date,
                    tempCrop: stage.tempCrop
                })
            })
            .then(response => response.json())
            .then(updatedBed => {
                setTimeout(() => {
                    dispatch({type: 'REPLACE_SINGLE_BED', bed: updatedBed})
                    dispatch({type: 'SET_BED', bed: updatedBed, date})
                    dispatch({type: 'SAVE_SUCCESS'})
                }, 2000)
                setTimeout(() => {
                    dispatch({type: 'SAVE_RESET'})
                }, 6000)
            })
        }
    } else {
        return invalidTimeRange()
    }
}


export function saveNewField(field, history) {
    return (dispatch) => {
        dispatch({type: 'LOADING_FIELDS'})
        fetch('http://localhost:2020/fields', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: field.fieldName,
                x_axis_count: field.xAxis,
                y_axis_count: field.yAxis,
                user_id: null
            })
        })
        .then(response => response.json())
        .then(newField => {
            dispatch({type: 'ADD_FIELD', fieldObj: newField})
            history.push(`/field/${newField.slug}`)
        })
    }
}


export function invalidTimeRange() {
    return {type: 'INVALID_TIME_RANGE'}
}

export function removeTimeMessage() {
    return {type: 'TIME_RANGE_RESET'}
}

export function saveReset() {
    return {type:'SAVE_RESET'}
}

export function displayModal() {
    return {type: 'DISPLAY_MODAL'}
}

export function removeModal() {
    return {type: 'REMOVE_MODAL'}
}