import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom'
import { unformatThenFormat } from '../helpers/dates'
import Flowers from '../assets/flowers.jpg'


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
      <Link to={`/field/${slug}`}>
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
              <CardMedia className={classes.cardMedia} image={Flowers} title='an image'/>
            </Hidden>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
}