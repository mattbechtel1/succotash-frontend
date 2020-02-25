import React from 'react'
import dirt from '../assets/dirt.jpg'
import legume from '../assets/chickpeas.jpg'
import grass from '../assets/grass.jpg'
import flower from '../assets/flowers.jpg'
import grain from '../assets/wheat.jpg'
import herb from '../assets/basil.jpg'
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/styles'
import { Card, Typography, CardContent, CardActionArea, Avatar} from '@material-ui/core'
import { connect } from 'react-redux'
import { setBed } from '../redux_files/actions'
import { convertBedToCurrentStage, capitalize } from '../helpers/conversions'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        backgroundColor: theme.palette.primary.main,
        borderRadius: 25
    }
}))

const picDictionary = {
    'other': dirt,
    'fruit': dirt,
    'vegetable': dirt,
    'grain': grain,
    'flower': flower,
    'legume': legume,
    'grass': grass,
    'herb': herb
}

const BedTile = ({bed, date, setBed}) => {
    const classes = useStyles()
    
    const stage = convertBedToCurrentStage(bed, date)
    const cropCat = stage.crop ? stage.crop.category : 'other'
    const cropImg = stage.crop ? stage.crop.pic_url : null

    
    return <div onClick={() => setBed(bed, date)} className='extend-bottom'>
        <Card className={classes.root}>
            <CardActionArea>
                <Image src={picDictionary[cropCat]} className='rounded-corner' />
                <CardContent>
                    
                    <Typography gutterBottom variant="h5" component="h2">
                        {bed.name}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="h3">
                        <span className='vert-center-span'>
                            {cropImg ? <Avatar src={cropImg} alt={stage.crop.name} style={{marginRight: '5px'}}/> : null} 
                            {stage.crop ? stage.crop.name : 'No Crop Set'}
                        </span>
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