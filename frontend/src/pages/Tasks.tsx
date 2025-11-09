import React,{useEffect,useState} from 'react';
import api from '../lib/api';

type Task={_id:string; title:string; done:boolean};
export default function Tasks(){
  const [tasks,setTasks]=useState<Task[]>([]); const [title,setTitle]=useState('');
  function load(){ api.get('/tasks').then(r=>setTasks(r.data)); }
  useEffect(load,[]);
  async function add(){ if(!title.trim()) return; await api.post('/tasks',{title}); setTitle(''); load(); }
  async function toggle(id:string,done:boolean){ await api.patch('/tasks/'+id,{done}); load(); }
  async function del(id:string){ if(!confirm('Delete task?')) return; await api.delete('/tasks/'+id); load(); }
  return (
    <div>
      <div className="card"><div style={{fontWeight:700,marginBottom:8}}>Add Task</div>
        <div className="row"><div className="col"><input placeholder="Task" value={title} onChange={e=>setTitle(e.target.value)} /></div>
          <button className="btn primary" onClick={add}>Add +</button></div>
      </div>
      <ul className="list">{tasks.map(t=>(<li key={t._id} className="card" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}><button className={'btn '+(t.done?'primary':'')} onClick={()=>toggle(t._id,!t.done)}>{t.done?'✓':'○'}</button><div style={{textDecoration:t.done?'line-through':'none',fontWeight:700}}>{t.title}</div></div>
        <button className="btn danger" onClick={()=>del(t._id)}>Delete</button></li>))}
      </ul>
    </div>
  )
}
