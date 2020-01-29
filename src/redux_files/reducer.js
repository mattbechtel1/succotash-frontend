import { combineReducers } from 'redux'

var today = new Date()

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
            return {fields: action.fields, loading: false}
        case 'ADD_FIELD':
            return {fields: state.concat(action.fieldObj), loading: false}
        case 'LOADING_FIELDS':
            return {...state, loading: true}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    date: dateReducer,
    fields: fieldsReducer
})

export default rootReducer
