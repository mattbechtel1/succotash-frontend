import React from 'react'
import {List, Typography, Button, Dialog, CircularProgress, Backdrop} from '@material-ui/core'
import {connect} from 'react-redux'
import TodoBullet from './TodoBullet'
import NewDeadlineForm from './NewDeadlineForm'
import {cardStyles} from '../helpers/themeOverrides'
import {unformatThenFormat} from '../helpers/dates'
import {removeSecondModal, displaySecondModal} from '../redux_files/actions'


const TodoContainer = ({todos=[], modal2, removeSecondModal, displaySecondModal, defaultField, loader}) => {
  const classes = cardStyles()

  return <div className='wrapper'>
      <Backdrop open={loader} className={classes.backdrop}>
        <CircularProgress color='secondary' />
      </Backdrop>

      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Upcoming Deadlines
      </Typography>
      
      <List>
          {todos.map((todo, index) => {
              let text = `${unformatThenFormat(todo.due_date)} - ${todo.note}`

              if (todo.field) {
                  text = `${text}: ${todo.field.name}`
              }
          
              if (todo.bed) {
                  text = `${text} - ${todo.bed.name}`
              }
            return <TodoBullet todo={todo} index={index} key={`todo-${text}`} text={text} /> }
          )}
      </List>

      <Button onClick={displaySecondModal}>Add a New Deadline</Button>

      <Dialog open={modal2} onClose={removeSecondModal} aria-labelledby="form-dialog-title">
        <NewDeadlineForm defaultField={defaultField} />
      </Dialog>
  </div>
}

const mapStateToProps = ({modal2, todos}) => ({
  modal2,
  loader: todos.loading
})

export default connect(mapStateToProps, {removeSecondModal, displaySecondModal})(TodoContainer)