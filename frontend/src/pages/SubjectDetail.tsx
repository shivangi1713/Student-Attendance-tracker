import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import ProgressRing from '../components/ProgressRing';

type Entry = { date: string; present: boolean };
type Subject = { _id: string; name: string; attended: number; total: number; targetPct: number; entries?: Entry[]; isLab?: boolean; updatedAt?: string; };
export default function SubjectDetail(){
  const { id } = useParams(); const nav=useNavigate();
  const [s,setS]=useState<Subject|null>(null); const [att,setAtt]=useState('0'); const [tot,setTot]=useState('0'); const [tar,setTar]=useState(75); const [loading,setLoading]=useState(true);
  async function load(){ if(!id) return; setLoading(true); try{ const r=await api.get(`/subjects/${id}`); const subj=r.data as Subject; setS(subj); setAtt(String(subj.attended||0)); setTot(String(subj.total||0)); setTar(subj.targetPct||75);} finally { setLoading(false);} }
  useEffect(()=>{load()},[id]);
  const missed = useMemo(()=>{ const a=Number(att)||0; const t=Number(tot)||0; return Math.max(0,t-a); },[att,tot]);
  const pct = useMemo(()=>{ const a=Number(att)||0; const t=Number(tot)||0; return t>0? (a*100)/t : 100; },[att,tot]);
  async function saveCounts(){ if(!id) return; const a=Math.max(0,Number(att)||0); const t=Math.max(0,Number(tot)||0); await api.patch(`/subjects/${id}`,{attended:a,total:t}); await load(); }
  async function saveTarget(v:number){ if(!id) return; setTar(v); await api.patch(`/subjects/${id}`,{targetPct:v}); await load(); }
  async function mark(present:boolean){ if(!id||!s) return; const newTotal=(s.total||0)+1; const newAtt=(s.attended||0)+(present?1:0); setAtt(String(newAtt)); setTot(String(newTotal)); await api.patch(`/subjects/${id}`,{attended:newAtt,total:newTotal}); await load(); }
  if(loading) return <div className="card">Loading…</div>
  if(!s) return <div className="card">Subject not found <button className="btn" onClick={()=>nav(-1)}>Go back</button></div>
  return (
    <div>
      <div className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div><div style={{fontWeight:900,fontSize:18}}>{s.name} {s.isLab ? <span className="badge purple" style={{ marginLeft: 8 }}>Lab</span> : null}</div><div className="small">Last updated: {new Date(s.updatedAt||Date.now()).toLocaleString()}</div></div>
        <button className="btn" onClick={()=>nav(-1)}>← Back</button>
      </div>
      <div className="row" style={{marginBottom:12}}>
        <button className="btn primary" onClick={()=>mark(true)}>Mark Present (today)</button>
        <button className="btn" onClick={()=>mark(false)}>Mark Absent (today)</button>
      </div>
      <div className="card">
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <ProgressRing value={pct}/><div className="kpi">{pct.toFixed(0)}%</div><div className="small">Target: {tar}%</div>
        </div>
        <div className="row" style={{marginTop:12}}>
          <div className="col"><label>Attended</label><input value={att} onChange={e=>setAtt(e.target.value.replace(/[^0-9]/g,''))}/></div>
          <div className="col"><label>Missed</label><input value={String(missed)} readOnly/></div>
          <div className="col"><label>Total</label><input value={tot} onChange={e=>setTot(e.target.value.replace(/[^0-9]/g,''))}/></div>
        </div>
        <div style={{marginTop:10,display:'flex',gap:10}}>
          <button className="btn primary" onClick={saveCounts}>Save Counts</button>
        </div>
      </div>
      <div className="card">
        <div><strong>Target %: {tar}</strong></div>
        <input type="range" min={50} max={100} value={tar} onChange={e=>saveTarget(Number(e.target.value))}/>
      </div>
    </div>
  )
}
