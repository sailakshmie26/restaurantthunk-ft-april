import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchRestaurant } from '../redux/restaurantSlice';

function Header() {
  const dispatch = useDispatch();                 // we can call an action from slice only using the useDispatch hook.
  return (
    <>
       <Navbar variant='dark mt-3'>
      <Container>
        <Link to={'/'} style={{textDecoration:'none', overflowY:'hidden'}}>
        <div className='d-flex justify-content-between align-items-center'>
        <Navbar.Brand>
        <img src="https://cdn-icons-png.flaticon.com/512/242/242452.png" 
        width='30'
        height='30'
        className='d-inline-block align-top me-3'
        />{' '}
        FOOD <span className='text-warning'>HUB</span>
        </Navbar.Brand>
        <input onChange={(e)=>dispatch(searchRestaurant(e.target.value))} type="text" className='form-control ms-6 w-100' placeholder='Search by Neighborhood'/>
        </div>
        </Link>        
      </Container>
    </Navbar>
    </>
  )
}

export default Header


