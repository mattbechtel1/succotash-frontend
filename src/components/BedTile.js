import React from 'react'
import dirt from '../assets/dirt.jpg'
import Image from 'material-ui-image'
import { connect } from 'react-redux'
import { setBed } from '../redux_files/actions'

const BedTile = ({bed, date, setBed}) => <div onClick={() => setBed(bed, date)}><Image src={dirt} className='rounded-corner' /></div>

const mapStateToProps = ({date}) => ({date})

export default connect(mapStateToProps, {setBed})(BedTile)