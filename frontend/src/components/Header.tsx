import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAuth, getAuth } from '../lib/auth';
export default function Header(){
  const nav = useNavigate();
  const [theme,setTheme]=useState<'dark'|'light'>(() => (localStorage.getItem('theme') as any) || 'dark');
  useEffect(()=>{ document.body.classList.toggle('light', theme==='light'); localStorage.setItem('theme', theme); },[theme]);
  function logout(){ clearAuth(); nav('/login'); }
  return (
    <header>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div>Welcome <small className="mono">{getAuth()?'(signed in)':''}</small></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>setTheme(t=>t==='light'?'dark':'light')}>
            {theme==='light'?'🌙 Dark':'🌞 Light'}
          </button>
          <button className="btn" onClick={logout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
