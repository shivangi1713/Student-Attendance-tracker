import React,{useEffect,useState} from 'react';
import api from '../lib/api';
const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export default function Routine(){
  const [rt,setRt]=useState<any>({planner:{},notifyTimes:{},manual:{}});
  const [file,setFile]=useState<File|null>(null);
  async function load(){ const r=await api.get('/routines'); setRt(r.data); }
  useEffect(()=>{load()},[]);
  async function save(){ await api.patch('/routines', rt); await load(); }
  async function upload(){ if(!file) return; const fd=new FormData(); fd.append('file',file); await api.post('/routines/picture',fd,{headers:{'Content-Type':'multipart/form-data'}}); await load(); }
  const today=DAYS[new Date().getDay()];
  return (
    <div>
      <div className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontWeight:900}}>Routine</div><div className="small">Today: {today}</div>
      </div>
      <div className="card"><div style={{fontWeight:700,marginBottom:8}}>Notify Time (per day)</div>
        <div className="row">{DAYS.map(d=>(<div className="col" key={d}><label>{d}</label>
          <input placeholder="HH:MM" value={rt.notifyTimes?.[d]||''} onChange={e=>setRt((v:any)=>({...v,notifyTimes:{...v.notifyTimes,[d]:e.target.value}}))}/></div>))}
        </div>
      </div>
      <div className="card"><div style={{fontWeight:700,marginBottom:8}}>Manual Text</div>
        {DAYS.map(d=>(<div key={d} style={{marginBottom:8}}><label className="small">{d}</label>
          <input value={(rt.manual||{})[d]||''} onChange={e=>setRt((v:any)=>({...v,manual:{...(v.manual||{}),[d]:e.target.value}}))}/></div>))}
      </div>
      <div className="card"><div style={{fontWeight:700,marginBottom:8}}>Picture</div>
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)}/>
        <button className="btn" onClick={upload} style={{marginTop:8}}>Upload</button>
        {rt.picturePath ? <img src={rt.picturePath} style={{maxWidth:'100%',marginTop:10}}/> : null}
      </div>
      <div style={{display:'flex',gap:8}}><button className="btn primary" onClick={save}>Save All</button>
        <button className="btn" onClick={load}>Reload</button></div>
    </div>
  )
}
