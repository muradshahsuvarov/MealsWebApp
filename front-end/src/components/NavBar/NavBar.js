import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavBar.module.css';

const NavBar = () => (
  <>
  <div className={styles.NavBar} onClick={() => {console.log('Go to home page')}}>
     <img width={100} height={100}  src='/pizzalogo.png'/>
  </div>
  </>
);

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
