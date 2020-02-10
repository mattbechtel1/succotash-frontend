import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Card, CardContent, List, Typography, Container} from '@material-ui/core'
import {connect} from 'react-redux'
import TodoBullet from './TodoBullet'


const useStyles = makeStyles(theme => ({
  title: { 
    fontSize: 14,
  },
  card: {
    display: 'inline-block',
    backgroundColor: theme.palette.primary.main
  },
  cardDetails: {
    flex: 1,
  },
}))

const TodoContainer = ({todos: {todos}}) => {
  const classes = useStyles()
  
  return <Container>
    <Card className={classes.card}>
      <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
            Upcoming Deadlines
          </Typography>
          <List>
              {todos.map((todo, index) => <TodoBullet todo={todo} index={index} key={`todo-${index}`} />)}
          </List>
      </CardContent>
  </Card>
</Container>
}

export default connect(({todos}) => ({todos}))(TodoContainer)