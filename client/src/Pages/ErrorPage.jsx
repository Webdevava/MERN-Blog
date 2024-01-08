import React from 'react'
import '../Styles/ErrorPage.scss'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error'>
    <p>!</p>
      <h1>404 Page Not Found</h1>
      
      <Link to='/'><button>Go to Home</button></Link>
    </div>
  )
}

export default ErrorPage
