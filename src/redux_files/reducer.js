import { combineReducers } from 'redux'
import { constructDate, sortDueDates } from '../helpers/dates'
import { convertBedToCurrentStage, sortAlphabetically, sortCropNameAlphabetically } from '../helpers/conversions'

var today = constructDate(new Date())

function dateReducer(state=today, action) {
    switch(action.type) {
        case "SET_DATE":
            return action.date
        default:
            return state
    }
}

function userReducer(state=null, action) {
    switch (action.type) {
        case 'INITIALIZE_APP':
            return action.user
        case 'LOGIN':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

function loadingReducer(state=false, action) {
    switch(action.type) {
        case 'LOADING':
            return true
        case 'NOT_LOADING':
            return false
        case 'INITIALIZE_APP':
            return false
        default:
            return state
    }
}

function fieldsReducer(state={
    fields: [],
    loading: false 
}, action) {
    let fieldIdx
        switch(action.type) {
            case 'INITIALIZE_APP':
                return {...state, fields: action.user.fields, loading: false}
            case 'LOGIN':
                return {...state, fields: action.user.fields, loading: false}
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
                const reconstrutedField = {...state.fields[targetFieldIdx], beds: reconstructedFieldBedList, updated_at: action.bed.updated_at}
                
                return {...state, 
                    fields: [...state.fields.slice(0, targetFieldIdx), reconstrutedField, ...state.fields.slice(targetFieldIdx + 1)]
                }
            case 'REMOVE_FIELD':
                return {...state,
                    loading: false,
                    fields: state.fields.filter(field => field.id !== action.id)
                }
            case 'REPLACE_SINGLE_FIELD':
                fieldIdx = state.fields.findIndex(field => field.id === action.field.id)
                return {
                    ...state,
                    loading: false,
                    fields: [...state.fields.slice(0, fieldIdx), action.field, ...state.fields.slice(fieldIdx + 1)]
                 }
            case 'SAVE_SUCCESS':
                fieldIdx = state.fields.findIndex(field => field.id === action.fieldId)
                let editedField = state.fields[fieldIdx] = {
                    ...state.fields[fieldIdx],
                    updated_at: action.time
                }
                return {
                    ...state,
                    fields: [...state.fields.slice(0, fieldIdx), editedField, ...state.fields.slice(fieldIdx + 1)]
                }
            case 'STOP_LOAD':
                return {
                    ...state,
                    loading: false
                }
            default:
                return state
    }
}

function fieldFormReducer(state={
    name: 'YOUR FIELD NAME HERE',
    pic: 'YOUR PIC URL HERE'
}, action) {
    switch(action.type) {
        case 'EDIT_FIELD_NAME':
           return {
               ...state,
               name: action.name
           }
        case 'EDIT_FIELD_PIC':
            return {
                ...state,
                pic: action.pic
            }
        case 'RESET_FORM':
            return {
                name: 'YOUR FIELD NAME HERE',
                pic: 'YOUR PIC URL HERE'
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
    saving: false,
    successMessage: false
}, action) {
    switch(action.type) {
        case 'SET_BED':
            return {...state, loadingTitle: false}
        case 'EDIT_BED_TITLE':
            return {...state, titleInput: true}
        case 'CLOSE_TITLE_INPUT':
            return {...state, titleInput: false}
        case 'UNSET_BED':
            return {...state, titleInput: false}
        case 'UPDATING_BED':
            return {...state, titleInput: false, loadingTitle: true}
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

function imageZoomReducer(state={
    image: '',
    display: false
}, action) {
    switch(action.type) {
        case 'DISPLAY_IMAGE':
            return {
                image: action.image,
                display: true
            }
        case 'REMOVE_MODAL':
            return {
                image: '',
                display: false
            }
        default:
            return state
    }
}

function modal2Reducer(state=false, action) {
    switch(action.type) {
        case 'DISPLAY_SECONDARY_MODAL':
            return true
        case 'REMOVE_SECONDARY_MODAL':
            return false
        default:
            return state
    }
}

function modal3Reducer(state=false, action) {
    switch(action.type) {
        case 'DISPLAY_TERTIARY_MODAL':
            return true
        case 'REMOVE_TERTIARY_MODAL':
            return false
        default:
            return state
    }
}

function modal4Reducer(state=false, action) {
    switch(action.type) {
        case 'DISPLAY_QUATERNARY_MODAL':
            return true
        case 'REMOVE_QUATERNARY_MODAL':
            return false
        default:
            return state
    }
}

function modal5Reducer(state=false, action) {
    switch(action.type) {
        case 'DISPLAY_QUINARY_MODAL':
            return true
        case 'REMOVE_QUINARY_MODAL':
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
                [action.dateType]: action.date,
                dateChanged: true,
            }
        case 'EDIT_STAGE_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'EDIT_CROP': 
            return {
                ...state,
                crop: action.crop
            }
        default: 
            return state
    }
}

function loginReducer(state={
    username: '',
    password: '',
    confirmPassword: ''
}, action) {
    switch(action.type) {
        case 'CHANGE_TEXT_FIELD':
            return {...state, 
                [action.fieldName]: action.text}
        case 'CLEAR_FORM':
            return {username: '', password: '', confirmPassword: ''}
        default:
            return state
    }
}

function toastReducer(state={
    text: '',
    severity: '',
    open: false
}, action) {
    switch (action.type) {
        case 'DISPLAY_TOAST':
            return {open: true, text: action.text, severity: action.severity}
        case 'HIDE_TOAST':
            return {open: false, text: '', severity: ''}
        default:
            return state
    }
}

function todoReducer(state={
    todos: [],
    loading: false
}, action) {
    switch (action.type) {
        case 'INITIALIZE_APP':
            return {loading: false, todos: sortDueDates(action.user.todos)}
        case 'LOGIN':
            return {loading: false, todos: sortDueDates(action.user.todos)}
        case 'ADD_TODO':
            return {loading: false, todos: sortDueDates(state.todos.concat([action.todo]))}
        case 'PATCH_TODO':
            const editedTodoIndex = state.todos.findIndex(todo => todo.id === action.todo.id)
        
            return {
                loading: false,
                todos: [...state.todos.slice(0, editedTodoIndex), action.todo, ...state.todos.slice(editedTodoIndex + 1)]
            }
        case 'REMOVE_TODO':
            const deletedTodoIndex = state.todos.findIndex(todo => todo.id === action.todo.id)

            return {
                loading: false,
                todos: [...state.todos.slice(0, deletedTodoIndex), ...state.todos.slice(deletedTodoIndex + 1)]
            }
        case 'EDITING_TODOS':
            return {...state, loading: true}
        case 'NOT_LOADING':
            return {...state, loading: false}
        case 'REPLACE_SINGLE_BED':
            let updatedWithBedName = state.todos.map(todo => {
                if (todo.bed_id === action.bed.id) {
                    todo.bed.name = action.bed.name
                } 
                return todo
            })

            return {...state,
                todos: updatedWithBedName 
            }

        case 'REPLACE_SINGLE_FIELD':
            let updatedWithFieldName = state.todos.map(todo => {
                if (todo.field_id === action.field.id) {
                     todo.field.name = action.field.name
                }
                return todo
            })
            
            return {...state,
                    todos: updatedWithFieldName 
            }

        default:
            return state
    }
}

function cropReducer(state=[], action) {
    switch(action.type) {
        case 'INITIALIZE_APP':
            return action.crops
        case 'SEED_CROPS':
            return action.crops
        case 'ADD_CROP':
            return sortAlphabetically([...state, action.crop])
        default:
            return state
    }
}

function favoritesReducer(state={
    favorites: [],
    loading: false
}, action) {
    switch(action.type) {
        case 'INITIALIZE_APP':
            return {
                loading: false,
                favorites: sortCropNameAlphabetically(action.user.favorites)
            }
        case 'LOGIN':
            return {
                loading: false,
                favorites: sortCropNameAlphabetically(action.user.favorites)
            }
        case 'ADD_FAVORITE':
            return {
                loading: false,
                favorites: sortCropNameAlphabetically([...state.favorites, action.favorite])
            }
        case 'REMOVE_FAVORITE':
            return {
                loading: false,
                favorites: state.favorites.filter(favorite => favorite.id !== action.favorite_id)
            }
        case 'UPDATING_FAVORITES':
            return {
                ...state,
                loading: true
            }     
        default:
            return state
    }
}

const rootReducer = combineReducers({
    date: dateReducer,
    user: userReducer,
    fields: fieldsReducer,
    fieldForm: fieldFormReducer,
    bed: bedReducer,
    sidebar: sidebarStateReducer,
    stage: stageReducer,
    imageZoom: imageZoomReducer,
    modal: modalReducer,
    modal2: modal2Reducer,
    modal3: modal3Reducer,
    modal4: modal4Reducer,
    modal5: modal5Reducer,
    login: loginReducer,
    toast: toastReducer,
    loading: loadingReducer,
    todos: todoReducer,
    crops: cropReducer,
    favorites: favoritesReducer
})

export default rootReducer