import React from 'react'
import dirt from '../assets/dirt.jpg'
import Image from 'material-ui-image'
import { connect } from 'react-redux'
import { setBed } from '../redux_files/actions'
import { convertBedToCurrentStage } from '../helpers/conversions'

const BedTile = ({bed, date, setBed}) => <div onClick={() => setBed(bed, date)} className='extend-bottom'>
    <Image src={dirt} className='rounded-corner' />
    <h4>{convertBedToCurrentStage(bed, date).tempCrop || 'No Current Crop'}</h4>
</div>

const mapStateToProps = ({date}) => ({date})

export default connect(mapStateToProps, {setBed})(BedTile)