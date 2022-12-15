import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <>
    <div className='navbar'>
    <Link to='/'>
        <h1> Coin<span className='purple'>Dex</span></h1>
    </Link> 
    </div>
    <div className='Btn'>
    <Link to='/login'>
    <Button variant="contained">Login</Button>
    </Link>
    <Link to='/watchlist'>
    <Button variant="text">WatchList</Button>
    </Link>
    <Link to='/register'>
    <Button className='BtnR' variant="outlined">Register</Button>
    </Link>
    </div>
    </>
  )
}

export default Navbar