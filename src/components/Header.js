import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../services/firebase'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import '../styles/Header.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
}))

const Header = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            ChatApp
          </Typography>

          {auth().currentUser ? (
            <React.Fragment>
              {' '}
              <Button color='inherit'>
                <Link className={classes.link} to='/chat'>
                  Chats
                </Link>
              </Button>
              <Button onClick={() => auth().signOut()} color='inherit'>
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button color='inherit'>
                <Link className={classes.link} to='/login'>
                  Sign In
                </Link>
              </Button>
              <Button>
                <Link className={classes.link} to='/signup'>
                  Sign Up
                </Link>
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
