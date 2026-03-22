import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Live Dev</h1>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Home
          </NavLink>
          <NavLink to="/roles" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Roles
          </NavLink>
          <NavLink to="/disciplinas" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Disciplinas
          </NavLink>
          <NavLink to="/flujos" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Flujos
          </NavLink>
          <hr className="nav-divider" />
          <NavLink to="/prompts" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Prompts
          </NavLink>
          <NavLink to="/agentes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Agentes
          </NavLink>
          <NavLink to="/servicios" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Servicios
          </NavLink>
          <NavLink to="/manuales" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Manuales
          </NavLink>
          <hr className="nav-divider" />
          <NavLink to="/buscar" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Buscar
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
