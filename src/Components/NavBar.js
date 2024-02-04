import React from 'react';
import { Link } from 'react-router-dom';
import escolaIcone from '../assets/img/logo512.png';
import '../assets/css/navbar.css'

const Navbar = ({ isLogged, signUserOut }) => {
    return (
        <nav className='navbar'>
            <Link to="/" className="logo">
                <img src={escolaIcone} alt="Ícone Escola" className="escola-icone" />
                <h3 className="text">Colegio Modelo - Administrativo</h3>
            </Link>
        </nav>
    );
};

export default Navbar;
