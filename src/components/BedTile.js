import React from 'react'
import dirt from '../assets/dirt.jpg'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setBed } from '../redux_files/actions'

const BedTile = ({bed, setBed}) => {

    return <div onClick={(e) => setBed(bed)}>
        <Image src={dirt} rounded />
    </div>
}

export default connect(null, {setBed})(BedTile)