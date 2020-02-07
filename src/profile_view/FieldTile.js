import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { unformatThenFormat } from '../helpers/dates'
import Wheat from '../assets/wheat.jpg'


const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FieldLink({field: {slug, updated_at, name}}) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6}>
      <Link to={`/field/${slug}`} className='text-link'>
        <CardActionArea>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Last updated: {unformatThenFormat(updated_at)}
                </Typography>
                {/* <Typography variant="subtitle1" paragraph>
                  {field.description}
                </Typography> */}
                <Typography variant="subtitle1" color="primary">
                  View & Edit Field
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia className={classes.cardMedia} image={Wheat} title='wheat'/>
            </Hidden>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
}