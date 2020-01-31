import { combineReducers } from 'redux'

var today = new Date()

function dateFormatter(date) {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function dateReducer(state=today, action) {
    let editingDate = new Date(state)
    switch(action.type) {
        case "DATE_FORWARD":
            editingDate.setDate(state.getDate() + action.days)
            return editingDate
        case "DATE_BACKWARD":
            editingDate.setDate(state.getDate() - action.days)
            return editingDate
        case "SET_DATE":
            if (action.slug) {
                window.location.href = 'http://localhost:3000/field/' + action.slug + '?date=' + dateFormatter(action.date)
            } 
            return action.date
        default:
            return state
    }
}

function fieldsReducer(state={
    fields: [],
    loading: false}, action) {
    switch(action.type) {
        case 'SEED_FIELDS':
            return {...state, fields: action.fields, loading: false}
        case 'ADD_FIELD':
            return {...state, fields: state.concat(action.fieldObj), loading: false}
        case 'LOADING_FIELDS':
            return {...state, loading: true}
        case 'REPLACE_SINGLE_BED':
            const targetFieldIdx = state.fields.findIndex(field => field.id === action.bed.field_id)
            const replacementBedIdx = state.fields[targetFieldIdx].beds.findIndex(bed => bed.id === action.bed.id)
            const reconstructedFieldBedList = [...state.fields[targetFieldIdx].beds.slice(0, replacementBedIdx), action.bed, ...state.fields[targetFieldIdx].beds.slice(replacementBedIdx + 1)]
            const reconstrutedField = {...state.fields[targetFieldIdx], beds: reconstructedFieldBedList}
            
            return {...state, 
                fields: [...state.fields.slice(0, targetFieldIdx), reconstrutedField, ...state.fields.slice(targetFieldIdx + 1)]
            }
        default:
            return state
    }
}

function bedReducer(state=null, action) {
    switch(action.type) {
        case 'SET_BED':
            return action.bed
        case 'UNSET_BED':
            return null
        default:
            return state
    }
}

function sidebarStateReducer(state={
    titleInput: false,
    loadingTitle: true
}, action) {
    switch(action.type) {
        case 'SET_BED':
            return {...state, loadingTitle: false}
        case 'EDIT_BED_TITLE':
            return {...state, titleInput: true}
        case 'UPDATING_BED':
            return {...state, titleInput: false, laodingTitle: true}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    date: dateReducer,
    fields: fieldsReducer,
    bed: bedReducer,
    sidebar: sidebarStateReducer
})

export default rootReducer
