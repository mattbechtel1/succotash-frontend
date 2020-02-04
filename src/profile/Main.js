import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core/';
import Markdown from './Markdown';

const useStyles = makeStyles(theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

export default function Main() {
  const classes = useStyles();
  const posts = [];

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        SOMETHING GOES HERE
      </Typography>
      <Divider />
      {posts.map(post => (
        <Markdown className={classes.markdown} key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}