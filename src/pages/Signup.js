import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  makeStyles,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Divider,
  Grid,
} from '@material-ui/core'
import { LockOutlined, Fingerprint } from '@material-ui/icons'
import { signup, singInWithGoogle } from '../helpers/auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    borderRadius: '8px',
    width: '400px',
    padding: '1rem',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#dc004e',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText: {
    color: '#dd0954',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
  },
  divider: {
    margin: theme.spacing(4),
  },
}))

const Signup = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const classes = useStyles()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = user
    setError('')
    try {
      await signup(email, password)
    } catch (error) {
      setError({ error: error.message })
    }
  }

  const googleSignIn = async () => {
    try {
      await singInWithGoogle()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <form
            autoComplete='off'
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <Typography align='center' component='h1' variant='h5'>
              Sign Up to{' '}
              <Link className={classes.link} to='/'>
                ChatApp
              </Link>
            </Typography>
            <Typography align='center' component='h4' variant='h6'>
              Fill in the form below to create an account.
            </Typography>
            <TextField
              variant='outlined'
              margin='normal'
              required={true}
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              autoFocus
              onChange={handleChange}
              value={user.email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required={true}
              fullWidth
              id='password'
              label='Password'
              name='password'
              type='password'
              onChange={handleChange}
              value={user.password}
            />
            <div>
              {error ? (
                <Typography className={classes.errorText}>{error}</Typography>
              ) : null}
              <Grid container justify='center'>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  type='submit'
                >
                  Sign up
                </Button>
              </Grid>
              <Grid container justify='center'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={googleSignIn}
                  type='button'
                  startIcon={<Fingerprint />}
                >
                  Sign up with Google
                </Button>
              </Grid>
            </div>
            <Divider variant='fullWidth' className={classes.divider} />
            <Typography align='center'>
              Already have an account?{' '}
              <Link className={classes.link} to='/login'>
                Login
              </Link>
            </Typography>
          </form>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Signup
