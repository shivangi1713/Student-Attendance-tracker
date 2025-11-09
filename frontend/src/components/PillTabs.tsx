import React from 'react';
export default function PillTabs({tabs,active,onChange}:{tabs:string[];active:string;onChange:(t:string)=>void}){
  return <div className="pill-tabs">{tabs.map(t=>
    <button key={t} className={t===active?'active':''} onClick={()=>onChange(t)}>{t}</button>)}</div>;
}
