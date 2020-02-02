export function setNewDate(date, urlSlug) {
    return {type: 'SET_DATE', date, slug: urlSlug}
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
    if (!!stage.due_date && !!stage.start_date && new Date(stage.start_date) < new Date(stage.due_date)) {
        return (dispatch) => {
            dispatch({type: 'UPDATING_BED'})
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
                    temp_crop: stage.temp_crop
                })
            })
            .then(response => response.json())
            .then(updatedBed => {
                dispatch({type: 'REPLACE_SINGLE_BED', bed: updatedBed})
                dispatch({type: 'SET_BED', bed: updatedBed, date})
            })
            .then(() => {dispatch({type:'SAVE_SUCCESS'})} )
        }
    } else {
        return invalidTimeRange()
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