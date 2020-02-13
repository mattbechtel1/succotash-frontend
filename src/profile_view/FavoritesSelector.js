import React from 'react'
import {connect} from 'react-redux'
import GreenButton from '../components/GreenButton'
import { makeStyles, FormControlLabel, Checkbox, DialogTitle, FormControl, FormGroup, DialogActions } from '@material-ui/core'
import { removeThirdModal, addFavorite, removeFavorite } from '../redux_files/actions'

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

const FavoritesSelectorForm = ({crops, favorites: {favorites, loading}, user, addFavorite, removeFavorite, removeThirdModal}) => {
    const classes = useStyles()

    const toggleFavorite = (e) => {
        if (e.target.checked) {
            addFavorite(e.target.value, user.id)
        } else {
            const deleteableFavorite = favorites.find(favorite => favorite.crop_id === e.target.value)
            removeFavorite(deleteableFavorite.id)
        }
    }

    return <>
        <DialogTitle>Adjust Your Favorite Products</DialogTitle>
        <FormControl component='fieldset' className={classes.formControl}>
            <FormGroup row>
                {crops.map(crop => {
                    return <FormControlLabel 
                        control={
                            <Checkbox
                                checked={!!favorites.find(favorite => favorite.crop_id === crop.id)}
                                onChange={toggleFavorite}
                                value={crop.id}
                                color="secondary"
                            />}
                        label={crop.name}
                        key={crop.id}
                    />
                })}
            </FormGroup>
        </FormControl>

        <DialogActions>
            <GreenButton callback={removeThirdModal} text={<>Close</>} />
        </DialogActions>
    </>
}

export default connect(({crops, favorites, user}) => ({crops, favorites, user}), {removeThirdModal, addFavorite, removeFavorite})(FavoritesSelectorForm)