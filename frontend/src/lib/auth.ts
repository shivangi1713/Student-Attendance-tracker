export function setToken(token:string){ localStorage.setItem('token', token); }
export function getToken(){ return localStorage.getItem('token') || ''; }
export function clearAuth(){ localStorage.removeItem('token'); }
export function getAuth(){ return !!getToken(); }
