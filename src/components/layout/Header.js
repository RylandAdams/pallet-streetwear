// src/components/Layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
	return (
		<header className='site-header'>
			<div className='logo'>
				<Link to='/'>
					<img
						src='/images/logo.png'
						alt='StreetWear Shop Logo'
					/>
				</Link>
			</div>
			<Navigation />
		</header>
	);
};

export default Header;
