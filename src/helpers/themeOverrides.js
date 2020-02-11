import { createMuiTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/'

export const datePickerOverride = createMuiTheme(({
    palette: {
        primary: {
            main: '#cabf45'
        }
    }
})); 

export const formStyles = () => {
    return makeStyles(theme => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: 400,
          },
        },  
        formControl: {
            minWidth: 50,
            marginRight: '12px',
            marginLeft: '12px',
            marginBottom: '12px'
          },
        selectEmpty: {
            marginTop: '12px'
          }
      }));          
}