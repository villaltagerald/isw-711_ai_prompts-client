import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Navigation from '../../Components/Navigation/Navigation';
//import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './Home.scss'

const Home = () => {
	const location = useLocation();
	const user = useSelector((state) => state.user);

	const isHomePage = location.pathname === '/';
	
	return (
		<div className='container__Home'>
			<Navigation />
			<Header
			//title={"Titulo de pagina"}
			//description={"descripcion del sitio"}
			/>

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