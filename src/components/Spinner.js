import React from 'react'
import { makeStyles, Backdrop, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const Spinner = (props) => {
  const { open } = props
  const classes = useStyles()

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress />
    </Backdrop>
  )
}

export default Spinner
