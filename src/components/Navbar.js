import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <>
    <Link to='/'>
    <div className='navbar'>
        <h1> Coin<span className='purple'>Dex</span></h1>
    </div>
    </Link> 
    <Link to='/login'>
    <Button variant="outlined">Login</Button>
    </Link>
    </>
  )
}

export default Navbar