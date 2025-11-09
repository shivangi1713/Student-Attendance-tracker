import React,{useEffect,useState} from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';
import PillTabs from '../components/PillTabs';

type Subject={_id:string;name:string;attended:number;total:number;targetPct:number;isLab?:boolean};
type RoutineDoc={ planner:Record<string,string[]>, notifyTimes:Record<string,string> };

const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function Subjects(){
  const nav=useNavigate();

  const [subs,setSubs]=useState<Subject[]>([]);
  const [routine,setRoutine]=useState<RoutineDoc|null>(null);

  const [name,setName]=useState('');
  const [isLab,setIsLab]=useState(false);
  const [adding,setAdding]=useState(false);

  const [tab,setTab]=useState<'Theory'|'Lab'>('Theory');

  function load(){
    api.get('/subjects').then(r=>setSubs(r.data)).catch(e=>{ console.error('Load subjects failed:', e); alert(e?.response?.data?.error||'Failed to load subjects'); });
    api.get('/routines').then(r=>setRoutine(r.data)).catch(e=>{ console.warn('No routine yet (ok):', e?.response?.data||e?.message); });
  }
  useEffect(load,[]);

  async function add(){
    const nm=name.trim();
    if(!nm) { alert('Enter subject name'); return; }
    try{
      setAdding(true);
      await api.post('/subjects',{name:nm, isLab});
      setName(''); setIsLab(false);
      const r=await api.get('/subjects'); setSubs(r.data);
    }catch(err:any){
      const msg = err?.response?.data?.error || err?.message || 'Failed to add subject';
      console.error('Add subject error:', err); alert(msg);
    }finally{ setAdding(false); }
  }

  async function del(id:string){ if(!confirm('Delete this subject?')) return; try{ await api.delete('/subjects/'+id); setSubs(prev=>prev.filter(s=>s._id!==id)); }catch(err:any){ console.error('Delete error:', err); alert(err?.response?.data?.error || 'Failed to delete'); } }
  async function rename(id:string){ const nm=prompt('New name?'); if(!nm) return; try{ await api.patch('/subjects/'+id,{name:nm}); setSubs(prev=>prev.map(s=>s._id===id?{...s,name:nm}:s)); }catch(err:any){ console.error('Rename error:', err); alert(err?.response?.data?.error || 'Failed to rename'); } }

  const shown=subs.filter(s=> (tab==='Lab') ? !!s.isLab : !s.isLab);

  const today=DAYS[new Date().getDay()];
  function nextTimeFor(id:string){ if(!routine) return null; const time=routine.notifyTimes?.[today]; const list=routine.planner?.[today]||[]; return list.includes(id) && time ? time : null; }

  return (
    <div>
      <div className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div>
          <div style={{fontWeight:900,fontSize:18}}>Attendance</div>
          <div className="small">{new Date().toDateString()}</div>
        </div>
        <PillTabs tabs={['Theory','Lab']} active={tab} onChange={(t)=>setTab(t as any)}/>
      </div>

      <div className="card">
        <div style={{fontWeight:700,marginBottom:8}}>Add Attendance</div>
        <div className="row">
          <div className="col"><input placeholder="Subject" value={name} onChange={e=>setName(e.target.value)} /></div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <label className="small">Lab?</label>
            <input type="checkbox" checked={isLab} onChange={e=>setIsLab(e.target.checked)} />
          </div>
          <button className="btn primary" onClick={add} disabled={adding}>{adding ? 'Adding…' : 'Add +'}</button>
        </div>
        <div className="small" style={{marginTop:8}}>Once saved, swipe the card (Left ← Right) to delete</div>
      </div>

      {shown.map(s=>{ const withTime={...s, nextTime: nextTimeFor(s._id)} as any; return (
        <SubjectCard key={s._id} s={withTime} onOpen={id=>nav('/subjects/'+id)} onDelete={del} onEdit={rename}/>
      );})}
    </div>
  );
}
