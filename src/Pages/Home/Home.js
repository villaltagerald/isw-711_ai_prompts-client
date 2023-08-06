import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Navigation from '../../Components/Navigation/Navigation';
import './Home.scss'

const Home = () => {
	const location = useLocation();
	const user = useSelector((state) => state.user);

	const isHomePage = location.pathname === '/';
	
	return (
		<div className='container__Home'>
			<Navigation />
			<Outlet />
			{isHomePage && (
				<div className="container__Home__name">
					<h2>Bienvenido {user.username}</h2>
				</div>
			)}
		</div>
	);
};

export default Home;