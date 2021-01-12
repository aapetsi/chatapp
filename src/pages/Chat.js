import React, { useState, useEffect } from 'react'
import { makeStyles, Button, TextField, Typography } from '@material-ui/core'
import { Send } from '@material-ui/icons'
import Header from '../components/Header'
import { auth } from '../services/firebase'
import { db } from '../services/firebase'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    marginRight: theme.spacing(2),
  },
  currentUser: {
    backgroundColor: '#bbdefb',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '300px',
    wordWrap: 'break-word',
    marginLeft: '80%',
  },
  otherUser: {
    backgroundColor: '#1E90FF',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '300px',
    wordWrap: 'break-word',
  },
}))

const Chat = () => {
  const [user] = useState(auth().currentUser)
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [, setReadError] = useState(null)
  const [writeError, setWriteError] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    async function fetchChats() {
      setReadError(null)
      try {
        db.ref('chat-app-d929b-default-rtdb').on('value', (snapshot) => {
          let chats = []
          snapshot.forEach((snap) => {
            chats.push(snap.val())
          })
          setChats(chats)
        })
      } catch (error) {
        setReadError(error.message)
      }
    }
    fetchChats()
  }, [])

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setWriteError(null)
    try {
      await db.ref('chat-app-d929b-default-rtdb').push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
        email: user.email,
      })
      setContent('')
    } catch (error) {
      setWriteError(error.message)
    }
  }

  const formatTime = (timestamp) => {
    const d = new Date(timestamp)
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    return time
  }

  return (
    <div>
      <Header />
      <div className='chat-area'>
        {chats.map((chat) => {
          return (
            <p
              key={chat.timestamp}
              className={
                chat.uid === user.uid ? classes.currentUser : classes.otherUser
              }
            >
              {chat.content}
              <br />

              <span className='chat-time float-right'>
                {formatTime(chat.timestamp)}
              </span>
              <br />
              <Typography component='summary'>{chat.email}</Typography>
            </p>
          )
        })}
      </div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          variant='outlined'
          onChange={handleChange}
          value={content}
          margin='normal'
          required={true}
          label='Message'
          className={classes.input}
        />
        {writeError ? <p>{writeError}</p> : null}
        <Button
          type='submit'
          variant='contained'
          color='primary'
          startIcon={<Send />}
          disabled={content.length === 0}
        >
          Send
        </Button>
      </form>
      <div>
        <Typography align='right' style={{ marginTop: '30px' }}>
          Logged in as: <strong>{user.email}</strong>
        </Typography>
      </div>
    </div>
  )
}

export default Chat
