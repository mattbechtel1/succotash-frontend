import React from 'react'
import dirt from '../assets/dirt.jpg'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setBed } from '../redux_files/actions'

const BedTile = ({bed, date, setBed}) => <div onClick={() => setBed(bed, date)}><Image src={dirt} rounded /></div>

const mapStateToProps = ({date}) => ({date})

export default connect(mapStateToProps, {setBed})(BedTile)