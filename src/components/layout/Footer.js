// src/components/Layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='site-footer'>
			<div className='footer-links'>
				<Link to='/about'>About Us</Link>
				<Link to='/contact'>Contact</Link>
				<Link to='/privacy'>Privacy Policy</Link>
			</div>
			<div className='copyright'>
				© {new Date().getFullYear()} StreetWear Shop. All rights
				reserved.
			</div>
		</footer>
	);
};

export default Footer;
