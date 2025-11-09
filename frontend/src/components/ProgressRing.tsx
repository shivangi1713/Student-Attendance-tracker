import React from 'react';
type Props={ value:number; size?:number; stroke?:number };
export default function ProgressRing({value,size=58,stroke=8}:Props){
  const r=(size-stroke)/2, c=2*Math.PI*r, pct=Math.max(0,Math.min(100,value));
  const off=c-(pct/100)*c;
  return (
    <div className="ring" style={{width:size,height:size}}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--ring-track)" strokeWidth={stroke} fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--primary-2)" strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"/>
      </svg>
      <div className="center">{pct.toFixed(0)}%</div>
    </div>
  );
}
