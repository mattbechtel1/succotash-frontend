import { combineReducers } from 'redux'
import { constructDate } from '../helpers/dates'
import { convertBedToCurrentStage } from '../helpers/conversions'

var today = constructDate(new Date())

function dateReducer(state=today, action) {
    // let editingDate = new Date(state)
    // debugger
    switch(action.type) {
        // case "DATE_FORWARD":
        //     editingDate.setDate(state.getDate() + action.days)
        //     return editingDate
        // case "DATE_BACKWARD":
        //     editingDate.setDate(state.getDate() - action.days)
        //     return editingDate
        case "SET_DATE":
            return action.date
        default:
            return state
    }
}

function userReducer(state=null, action) {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'LOGOUT':
            return null
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
            return {...state, fields: state.fields.concat(action.fieldObj), loading: false}
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
    loadingTitle: true,
    timeRangeWarning: false,
    saving: false,
    successMessage: false
}, action) {
    switch(action.type) {
        case 'SET_BED':
            return {...state, loadingTitle: false}
        case 'EDIT_BED_TITLE':
            return {...state, titleInput: true}
        case 'UPDATING_BED':
            return {...state, titleInput: false, loadingTitle: true}
        case 'INVALID_TIME_RANGE':
            return {...state, timeRangeWarning: true}
        case 'TIME_RANGE_RESET':
            return {...state, timeRangeWarning: false}
        case 'SAVE_SUCCESS':
            return {...state, successMessage: true, saving: false}
        case 'SAVE_RESET':
            return {...state, successMessage: false, saving: false}
        case 'SAVING_STAGE':
            return {...state, saving: true}
        default:
            return state
    }
}

function modalReducer(state=false, action) {
    switch(action.type) {
        case 'DISPLAY_MODAL':
            return true 
        case 'REMOVE_MODAL':
            return false
        default:
            return state
    }
}

function stageReducer(state=null, action) {
    switch(action.type) {
        case 'SET_BED':
            return convertBedToCurrentStage(action.bed, action.date)
        case 'UNSET_BED':
            return null
        case 'EDIT_STAGE_DATE':
            return {
                ...state,
                [action.dateType]: action.date
            }
        case 'EDIT_STAGE_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'EDIT_TEMP_CROP': 
            return {
                ...state,
                tempCrop: action.crop
            }
        default: 
            return state
    }
}

function LoginReducer(state={
    username: '',
    password: ''
}, action) {
    switch(action.type) {
        case 'CHANGE_TEXT_FIELD':
            return {...state, 
                [action.fieldName]: action.text}
        case 'CLEAR_FORM':
            return {username: '', password: ''}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    date: dateReducer,
    user: userReducer,
    fields: fieldsReducer,
    bed: bedReducer,
    sidebar: sidebarStateReducer,
    stage: stageReducer,
    modal: modalReducer,
    login: LoginReducer
})

export default rootReducer
