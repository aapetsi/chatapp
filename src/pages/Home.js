import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

class HomePage extends Component {
  render() {
    return (
      <div className='home'>
        <Header />
        <section>
          <div className='jumbotron jumbotron-fluid py-5'>
            <div className='container text-center py-5'>
              <h1 className='display-4'>Welcome to ChatApp</h1>
              <p className='lead'>A great place to chat</p>
              <div className='mt-4'>
                <Button
                  style={{ marginRight: '40px' }}
                  variant='contained'
                  color='primary'
                >
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to='/signup'
                  >
                    Create New Account
                  </Link>
                </Button>

                <Button variant='contained' color='primary'>
                  <Link
                    style={{ textDecoration: 'none', color: 'white' }}
                    to='/login'
                  >
                    Login to Your Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}

export default HomePage
