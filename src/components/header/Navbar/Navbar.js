import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='bg-gray-900 text-gray-100 text-xl font-noto shadow-xl'>
      <div className='flex justify-between p-4'>
        <Link to='/' className='font-nekro text-3xl'>
          Resutant Menu
        </Link>
        <div className='flex justify-around self-center'>
          <Link to='/' className='mx-3'>
            Home
          </Link>
          <Link to='/' className='mx-3'>
            Menu
          </Link>
          <Link to='/like' className='mx-3'>
            Bill
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
