import React from 'react'
import {connect} from 'react-redux'
import {unformatThenFormat} from '../helpers/dates'
import {toggleTodo, removeTodo} from '../redux_files/actions'
import {ListItem, Checkbox, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core'
import {Delete as DeleteIcon} from '@material-ui/icons'

const TodoBullet = ({todo, index, toggleTodo, removeTodo}) => {
    const checkClickHandler = () => toggleTodo(todo)
    const deleteClickHandler = () => removeTodo(todo)
    let text = `${unformatThenFormat(todo.due_date)} - ${todo.note}`
    
    if (todo.field) {
        text = `${text}: ${todo.field.name}`
    }

    if (todo.bed) {
        text = `${text} - ${todo.bed.name}`
    }
    return <>
        <ListItem key={todo.id} role={undefined} dense button onClick={checkClickHandler}>
            <Checkbox
                edge='start'
                checked={todo.complete}
                tabIndex={-1}
                inputProps={{'aria-labelledby': `checkbox-list-label-${index}`}}
            />
            <ListItemText primary={text} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={deleteClickHandler}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </>
}

export default connect(null, {toggleTodo, removeTodo})(TodoBullet)