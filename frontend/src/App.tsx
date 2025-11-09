import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import { getAuth } from './lib/auth'
export default function App(){
  const nav = useNavigate();
  const authed = !!getAuth();
  useEffect(()=>{ if(!authed) nav('/login', {replace:true}); },[authed, nav]);
  if(!authed) return null;
  return (
    <div className="app">
      <nav>
        <div className="brand">Attendance</div>
        <NavLink to="/" end>Subjects</NavLink>
        <NavLink to="/routine">Routine</NavLink>
        <NavLink to="/tasks">To-Do</NavLink>
      </nav>
      <div style={{flex:1}}>
        <Header/>
        <main><div className="container"><Outlet/></div></main>
      </div>
    </div>
  )
}
