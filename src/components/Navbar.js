import React from 'react'
import { BiCoinStack } from 'react-icons/bi'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Link to='/'>
    <div className='navbar'>
        <BiCoinStack className='icon' />
        <h1> Coin <span className='purple'>Dex</span></h1>
    </div>
    </Link> 
  )
}

export default Navbar