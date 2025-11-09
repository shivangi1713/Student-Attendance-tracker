import React, { useState } from 'react';
import api from '../lib/api';
import { setToken } from '../lib/auth';
export default function Login(){
  const [tab,setTab]=useState<'login'|'register'>('login');
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  async function submit(e:React.FormEvent){ e.preventDefault(); try{ const url=tab==='login'?'/auth/login':'/auth/register'; const body=tab==='login'?{email,password}:{name,email,password}; const r=await api.post(url,body); setToken(r.data.token); window.location.href='/'; }catch(err:any){ alert(err?.response?.data?.error||'Error'); } }
  return (<div className="container"><div className="card" style={{maxWidth:420, margin:'40px auto'}}><div style={{display:'flex',gap:8, marginBottom:12}}><button className={'btn '+(tab==='login'?'primary':'')} onClick={()=>setTab('login')}>Login</button><button className={'btn '+(tab==='register'?'primary':'')} onClick={()=>setTab('register')}>Register</button></div><form onSubmit={submit}>{tab==='register'&&(<><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} required/></>)}<label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/><div style={{marginTop:12}}><button className="btn primary" type="submit">{tab==='login'?'Login':'Create account'}</button></div></form></div></div>) }
