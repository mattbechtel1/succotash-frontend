import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core/';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const FieldMenu = ({classes, fields: {fields}}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Manage Fields
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {fields.map(field => {
          return <Link key={field.name}
            to={`/field/${field.slug}`}
            className={classes.toolbarLink}
          >
            <MenuItem key={field.name} onClick={handleClose}>
              <Button>{field.name}</Button>
            </MenuItem>
          </Link>
        })}
      </Menu>
    </div>
  );
}

const mapStateToProps = ({fields}) => ({fields})

export default connect(mapStateToProps)(FieldMenu)