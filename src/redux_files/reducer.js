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

const rootReducer = combineReducers({
    date: dateReducer
})

export default rootReducer
