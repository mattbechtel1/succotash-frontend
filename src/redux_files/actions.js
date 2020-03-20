import {constructDate, formatUSA} from '../helpers/dates'
import {capitalize} from '../helpers/conversions'

const URL_DOMAIN = process.env.REACT_APP_DOMAIN

export function setInitialState(initialState) {
    return {type: 'INITIALIZE_APP', ...initialState}
}

export function setNewDate(date, urlSlug, history) {
    return (dispatch) => {
        dispatch({type: 'SET_DATE', date})
        history.push(`/field/${urlSlug}?date=${formatUSA(date)}`)
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

export function closeBedInput() {
    return {type: 'CLOSE_TITLE_INPUT'}
}

export function saveBedName(activeBed, newName, date) {
    return (dispatch) => {
        dispatch({type: 'UPDATING_BED', bed: activeBed})
        fetch(URL_DOMAIN + '/beds/' + activeBed.id, {
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
    return {type: 'EDIT_CROP', crop}
}

export function saveStage(stage, date) {
    const start_date = constructDate(stage.start_date)
    const due_date = constructDate(stage.due_date)
    
    if (start_date && (!due_date || start_date <= due_date)) {
        return (dispatch) => {
            dispatch({type: 'UPDATING_BED'})
            dispatch({type: 'SAVING_STAGE'})
            fetch(URL_DOMAIN + '/stages/', {
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
                    crop_id: stage.crop ? stage.crop.id : null
                })
            })
            .then(response => response.json())
            .then(updatedBed => {
                debugger
                setTimeout(() => {
                    dispatch({type: 'REPLACE_SINGLE_BED', bed: updatedBed})
                    dispatch({type: 'SET_BED', bed: updatedBed, date})
                    dispatch({type: 'SAVE_SUCCESS', fieldId: updatedBed.field_id, time: updatedBed.updated_at})
                }, 2000)
                setTimeout(() => {
                    dispatch({type: 'SAVE_RESET'})
                }, 6000)
            })
        }
    } else {
        return (dispatch) => dispatch(displayWarning('Due date must be later than or equal to start date'))
    }
}

export function saveNewUser(username, password) {
    return (dispatch) => {
        dispatch(loadPage())
        fetch(URL_DOMAIN + '/api/v1/users', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                localStorage.setItem('token', data.jwt)
                dispatch({type: 'LOGIN', user: data.user})
            } else {
                dispatch(displayWarning(data.error))
            }
        })
        .then(() => {
            dispatch(clearForm())
            dispatch(pageLoaded())
        })
    }
}

export function setUser(user) {
    return {type: 'LOGIN', user}
}

export function unsetUser() {
    localStorage.removeItem('token')
    return {type: 'LOGOUT'}
}

export function loadPage() {
    return ({type: 'LOADING'})
}

export function pageLoaded() {
    return ({type: 'NOT_LOADING'})
}

export function loginUser(username, password) {
    
    return (dispatch) => {
        dispatch(loadPage())
        fetch(URL_DOMAIN + '/api/v1/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(displayWarning(data.message))
                setTimeout(() => dispatch(hideToast), 3000)
                dispatch(pageLoaded())
            } else {
                localStorage.setItem('token', data.jwt)
                dispatch(pageLoaded())
                dispatch(setUser(data.user))
            }
        })
        .then(dispatch(clearForm()))
    }
}

export function saveNewField(field, user, history) {
    
    return (dispatch) => {
        dispatch(loadPage())
        fetch(URL_DOMAIN + '/fields', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: field.fieldName,
                x_axis_count: field.xAxis,
                y_axis_count: field.yAxis,
                user_id: user.id
            })
        })
        .then(response => response.json())
        .then(newField => {
            if (newField.error) {
                dispatch(pageLoaded())
                dispatch(displayWarning(newField.error))
            } else {
                dispatch({type: 'ADD_FIELD', fieldObj: newField})
                history.push(`/field/${newField.slug}`)
                dispatch(pageLoaded())
            }
        })
    }
}

export function saveReset() {
    return {type:'SAVE_RESET'}
}

export function editFieldName(name) {
    return {type: 'EDIT_FIELD_NAME', name}
}

export function editFieldPic(pic) {
    return {type: 'EDIT_FIELD_PIC', pic}
}

export function resetForm() {
    return {type: 'RESET_FORM'}
}

export function saveFieldUpdate(fieldId, name, pic, history) {
    return (dispatch) => {
        dispatch(loadPage())
        fetch(`${URL_DOMAIN}/fields/${fieldId}`, {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                pic_opt: pic 
            })
        })
        .then(response => response.json())
        .then(field => {
            if (field.error) {
                dispatch(displayWarning(field.error))
                dispatch(pageLoaded())
                dispatch(resetForm())
            } else {
                dispatch({type: 'REPLACE_SINGLE_FIELD', field})
                dispatch(pageLoaded())
                dispatch(resetForm())
                history.push(`/field/${field.slug}`)
            }
        })
    }
}

export function deleteField(field, history) {
    return (dispatch) => {
        dispatch(loadPage())
        fetch(`${URL_DOMAIN}/fields/${field.id}`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            dispatch({type: 'REMOVE_FIELD', id: field.id})
            dispatch(pageLoaded())
            history.push('/profile')
        })
    }
}

export function changeTextField(fieldName, text) {
    return ({type: 'CHANGE_TEXT_FIELD', fieldName, text})
}

export function clearForm() {
    return ({type: 'CLEAR_FORM'})
}

export function hideToast() {
    return {type: 'HIDE_TOAST'}
}

export function displayWarning(text) {
    return {type: 'DISPLAY_TOAST', text}
}

export function displayModal() {
    return {type: 'DISPLAY_MODAL'}
}

export function removeModal() {
    return {type: 'REMOVE_MODAL'}
}

export function addTodo(todo, user) {
    return (dispatch) => {
        dispatch(editingTodos())
        fetch(`${URL_DOMAIN}/todos`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                note: todo.note,
                due_date: todo.due_date,
                complete: false,
                field_id: todo.field_id,
                bed_id: todo.bed_id
            })
        })
        .then(response => response.json())
        .then(newTodo => {
            if (newTodo.error) {
                dispatch(displayWarning(newTodo.error))
                dispatch(pageLoaded())
            } else {
                dispatch({type: 'ADD_TODO', todo: newTodo})
            }
        })
    }
}

export function editingTodos() {
    return {type: 'EDITING_TODOS'}
}

export function toggleTodo(todo) {
    return (dispatch) => {
        dispatch(editingTodos())
        fetch(`${URL_DOMAIN}/todos/${todo.id}`, {
            method: 'PATCH',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({complete: !todo.complete})
        })
        .then(response => response.json())
        .then(patchedTodo => {
            if (patchedTodo.error) {
                dispatch(displayWarning(patchedTodo.error))
                dispatch({type: 'NOT_LOADING'})
            } else {
                dispatch({type: 'PATCH_TODO', todo: patchedTodo})
            }
        })
    }
}

export function removeTodo(todo) {
    return (dispatch) => {
        dispatch(editingTodos())
        fetch(`${URL_DOMAIN}/todos/${todo.id}`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            dispatch({type: 'REMOVE_TODO', todo})
        })
    }
}

export function displaySecondModal() {
    return {type: 'DISPLAY_SECONDARY_MODAL'}
}

export function removeSecondModal() {
    return {type: 'REMOVE_SECONDARY_MODAL'}
}

export function displayThirdModal() {
    return {type: 'DISPLAY_TERTIARY_MODAL'}
}

export function removeThirdModal() {
    return {type: 'REMOVE_TERTIARY_MODAL'}
}

export function displayFourthModal() {
    return {type: 'DISPLAY_QUARTERNARY_MODAL'}
}

export function removeFourthModal() {
    return {type: 'REMOVE_QUARTERNARY_MODAL'}
}

export function seedCrops(crops) {
    return {type: 'SEED_CROPS', crops}
}

export function addCrop(crop) {
    return (dispatch) => {
        dispatch(loadPage())
        fetch(URL_DOMAIN + '/crops', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: capitalize(crop.name),
                default_measure: crop.default_measure.toLowerCase(),
                category: crop.category.toLowerCase()
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(pageLoaded())
                dispatch(displayWarning(data.error))
                setTimeout(() => {
                    dispatch(hideToast())
                }, 3000)
            } else {
                dispatch({type: 'ADD_CROP', crop: data})
                dispatch(changeCrop(data))
                dispatch(pageLoaded())
            }
        })
    }
}

export function addFavorite(crop_id, user_id) {
    return (dispatch) => {
        dispatch({type: 'UPDATING_FAVORITES'})
        fetch(`${URL_DOMAIN}/favorites`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                crop_id,
                user_id
            })
        })
        .then(response => response.json())
        .then(favorite => {
            dispatch({type: 'ADD_FAVORITE', favorite})
        })
    }
}

export function removeFavorite(favorite_id) {
    return (dispatch) => {
        dispatch({type: 'UPDATING_FAVORITES'})
        fetch(`${URL_DOMAIN}/favorites/${favorite_id}`, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(displayWarning(data.error))
            } else {
                dispatch({type: 'REMOVE_FAVORITE', favorite_id})
            }
        })
    }
}