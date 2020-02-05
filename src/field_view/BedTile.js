import React from 'react'
import dirt from '../assets/dirt.jpg'
import Image from 'material-ui-image'
import { connect } from 'react-redux'
import { setBed } from '../redux_files/actions'
import { convertBedToCurrentStage } from '../helpers/conversions'

const BedTile = ({bed, date, setBed}) => {
    const stage = convertBedToCurrentStage(bed, date)

    return <div onClick={() => setBed(bed, date)} className='extend-bottom'>
        <Image src={dirt} className='rounded-corner' />
        <h2 className='field-text'>{bed.name}
        <br />{stage.tempCrop ? stage.tempCrop : 'No Crop Set'}
        <br />Stage: {convertBedToCurrentStage(bed, date).status}</h2>
    </div>
}

const mapStateToProps = ({date}) => ({date})

export default connect(mapStateToProps, {setBed})(BedTile)