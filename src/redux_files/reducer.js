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
                window.history.pushState({date: action.date}, '', '/field/' + action.slug + '?date=' + dateFormatter(action.date))
                console.log('window.location.href is', window.location.href)
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

const rootReducer = combineReducers({
    date: dateReducer,
    fields: fieldsReducer,
    bed: bedReducer
})

export default rootReducer
