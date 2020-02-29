import React from 'react'

import { connect } from 'react-redux'
import { removeModal } from '../redux_files/actions'

import { Dialog, DialogActions } from '@material-ui/core'
import { GreenButton } from '../components/Buttons'
import Image from 'material-ui-image'


const ImageZoom = ({modal, image, removeModal}) => <Dialog 
    open={modal}
    onClose={removeModal}
    fullWidth>

        <Image
            src={image}
            disableSpinner
            aspectRatio={(16/9)}
        />

        <DialogActions>
            <GreenButton callback={removeModal}
                text='Close'
            />
        </DialogActions>
    </Dialog>

export default connect(({modal}) => ({modal}), {removeModal})(ImageZoom)