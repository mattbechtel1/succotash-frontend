import React from 'react'
import Button from '@material-ui/core/Button'

const GreenButton = ({callback, text, type}) => <Button onClick={callback} type={type} variant='contained' color='secondary' children={<>{text}</>} />

export default GreenButton