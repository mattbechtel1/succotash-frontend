import {Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'


const WarningButton = withStyles(theme => ({
    root: {
      color: theme.palette.warning.contrastText,
      backgroundColor: theme.palette.warning.dark,
      '&:hover': {
        backgroundColor: theme.palette.warning.main
      },
    },
  }))(Button);

  export default WarningButton