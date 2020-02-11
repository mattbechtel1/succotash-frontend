import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {List, Typography, Button, Dialog} from '@material-ui/core'
import {connect} from 'react-redux'
import TodoBullet from './TodoBullet'
import NewDeadlineForm from './NewDeadlineForm'
import {removeSecondModal, displaySecondModal} from '../redux_files/actions'


const useStyles = makeStyles(theme => ({
  title: { 
    fontSize: 14,
  },
  cardDetails: {
    flex: 1,
  },
}))

const TodoContainer = ({todos=[], modal2, removeSecondModal, displaySecondModal, defaultField}) => {
  const classes = useStyles()
  
  return <>
    <Typography className={classes.title} color="textSecondary" gutterBottom>
      Upcoming Deadlines
    </Typography>
    
    <List>
      {todos.map((todo, index) => <TodoBullet todo={todo} index={index} key={`todo-${index}`} />)}
    </List>

    <Button onClick={displaySecondModal}>Add a New Deadline</Button>

    <Dialog open={modal2} onClose={removeSecondModal} aria-labelledby="form-dialog-title">
       <NewDeadlineForm defaultField={defaultField} />
    </Dialog>
  </>
}

export default connect(({modal2}) => ({modal2}), {removeSecondModal, displaySecondModal})(TodoContainer)