import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <div className='headerContainer'>
      <MenuIcon className='menu' />
      <p className='logo'>Medication Tracker</p>
      <div className='menu'></div>
    </div>
  );
};

export default Header;
