import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/encuesta/crear" activeClassName="active">
            Crear Encuesta
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
