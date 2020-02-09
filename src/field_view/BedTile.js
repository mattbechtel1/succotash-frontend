import React from 'react'
import dirt from '../assets/dirt.jpg'
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/styles'
import { Card, Typography, CardContent, CardActionArea} from '@material-ui/core'
import { connect } from 'react-redux'
import { setBed } from '../redux_files/actions'
import { convertBedToCurrentStage, capitalize } from '../helpers/conversions'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 25
    },
    // media: {
    //     height: 100,
    //     borderRadius: 25
    // }
}))

const BedTile = ({bed, date, setBed}) => {
    const classes = useStyles()
    const stage = convertBedToCurrentStage(bed, date)

    
    return <div onClick={() => setBed(bed, date)} className='extend-bottom'>
        <Card className={classes.root}>
            <CardActionArea>
                {/* <CardMedia
                    className={classes.media}
                    image={dirt}
                    title='soil'
                /> */}
                <Image src={dirt} className='rounded-corner' />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {bed.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="h3">
                        {stage.tempCrop ? stage.tempCrop : 'No Crop Set'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="h3">
                        Stage: {capitalize(stage.status)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>
}

export default connect(({date}) => ({date}), {setBed})(BedTile)