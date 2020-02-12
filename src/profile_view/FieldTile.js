import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Hidden } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { unformatThenFormat } from '../helpers/dates'
import wheat from '../assets/wheat.jpg'
import basil from '../assets/basil.jpg'
import chickpeas from '../assets/chickpeas.jpg'
import grass from '../assets/grass.jpg'
import dirt from '../assets/dirt.jpg'
import flowers from '../assets/flowers.jpg'


const useStyles = makeStyles( theme => ({
  card: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}))

const imageDictionary = {
  'wheat': wheat,
  'soil': dirt,
  'legumes': chickpeas,
  'herb': basil,
  'flowers': flowers,
  'grass': grass
}
  
  
export default function FieldLink({field: {slug, updated_at, name, pic}}) {
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

                <Typography variant="subtitle1" color="primary">
                  View & Edit Field
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia className={classes.cardMedia} image={imageDictionary[pic]} title='image'/>
            </Hidden>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
}