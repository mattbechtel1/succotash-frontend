import React from 'react'

import { connect } from 'react-redux'
import { removeModal } from '../redux_files/actions'

import { Dialog, DialogActions } from '@material-ui/core'
import { GreenButton } from '../components/Buttons'
import Image from 'material-ui-image'


const ImageZoom = ({imageZoom, removeModal}) => {

return <Dialog 
    open={imageZoom.display}
    onClose={removeModal}
    fullWidth>

        <Image
            src={imageZoom.image}
            disableSpinner
            aspectRatio={(16/9)}
        />

        <DialogActions>
            <GreenButton callback={removeModal}
                text='Close'
            />
        </DialogActions>
    </Dialog>
}

export default connect(({imageZoom}) => ({imageZoom}), {removeModal})(ImageZoom)