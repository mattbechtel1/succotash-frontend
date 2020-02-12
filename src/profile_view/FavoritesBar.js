import React from 'react'
import {connect} from 'react-redux'
import {cardStyles} from '../helpers/themeOverrides'
import { Avatar, Typography, Container, CircularProgress, Dialog, Button, Tooltip } from '@material-ui/core'
import FavoritesSelector from './FavoritesSelector'
import { displayThirdModal, removeThirdModal } from '../redux_files/actions'

const FavoritesBar = ({favorites: {favorites}, modal3, displayThirdModal, removeThirdModal}) => {
    const classes = cardStyles()

    return <>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
            Favorite Crops
        </Typography>

        <Container style={{display: 'table'}}>
            <span>
                {favorites.map(favorite => <Tooltip title={favorite.crop.name} key={favorite.id}>
                    <Avatar src={favorite.crop.pic_url} alt={favorite.crop.name} style={{marginRight: '5px', display: 'inline-table'}} />
                </Tooltip>)}
            </span>    
        </Container>

        <Button onClick={displayThirdModal}>Adjust Your Favorites</Button>

        <Dialog open={modal3} onClose={removeThirdModal} aria-labelledby='form-dialog-title'>
            <FavoritesSelector />
        </Dialog>
    </>
}

export default connect(({favorites, modal3}) => ({favorites, modal3}), {displayThirdModal, removeThirdModal})(FavoritesBar)