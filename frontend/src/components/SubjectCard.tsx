import React from 'react';
import { SwipeableList, SwipeableListItem, TrailingActions, SwipeAction } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import ProgressRing from './ProgressRing';

type Subject = { _id: string; name: string; attended: number; total: number; targetPct: number; isLab?: boolean; nextTime?: string | null; updatedAt?: string; };

type Props = { s: Subject; onOpen: (id: string) => void; onDelete: (id: string) => void; onEdit: (id: string) => void; };

function guidance(a: number, t: number, target: number) {
  if (!t) return 'You are starting fresh';
  const pct = (a * 100) / t;
  if (pct >= target) {
    const canMiss = Math.max(0, Math.floor((a - (target / 100) * t) / (target / 100)));
    return canMiss <= 0 ? "Can't miss any class" : `Can miss ${canMiss} class${canMiss === 1 ? '' : 'es'}`;
  }
  const need = Math.max(0, Math.ceil((target / 100) * t) - a);
  return need <= 1 ? 'Attend next class' : `Attend ${need} classes in a row`;
}

export default function SubjectCard({ s, onOpen, onDelete, onEdit }: Props) {
  const missed = Math.max(0, s.total - s.attended);
  const pct = s.total ? (s.attended * 100) / s.total : 100;
  const trailing = () => (<TrailingActions><SwipeAction destructive onClick={() => onDelete(s._id)}>Delete</SwipeAction></TrailingActions>);
  return (
    <SwipeableList>
      <SwipeableListItem trailingActions={trailing()}>
        <div className="card" style={{ borderColor: 'rgba(138,106,255,.35)' }}>
          <div className="subject-row">
            <div className="subject-left" onClick={() => onOpen(s._id)} style={{ cursor: 'pointer' }}>
              <ProgressRing value={pct} />
              <div>
                <div className="subject-title">{s.name} {s.isLab ? <span className="badge purple" style={{ marginLeft: 8 }}>Lab</span> : null}</div>
                <div className="subject-sub">
                  <span className="badge blue">Attended: {s.attended}</span>
                  <span className="badge red">Missed: {missed}</span>
                  <span className="badge purple">Req: {s.targetPct}%</span>
                </div>
                <div className="small" style={{ marginTop: 6 }}>{guidance(s.attended, s.total, s.targetPct)}</div>
                {s.nextTime ? (<div className="small" style={{ marginTop: 4 }}>Today: {s.nextTime}</div>) : null}
              </div>
            </div>
            <div>
              <button className="btn" onClick={() => onEdit(s._id)}>✎</button>
            </div>
          </div>
          <div className="stat-row">
            <div className="stat"><span className="dot att" /> <span>Attended</span><strong>&nbsp;{s.attended}</strong></div>
            <div className="stat"><span className="dot miss" /> <span>Missed</span><strong>&nbsp;{missed}</strong></div>
            <div className="stat"><span className="dot req" /> <span>Required</span><strong>&nbsp;{s.targetPct}%</strong></div>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
