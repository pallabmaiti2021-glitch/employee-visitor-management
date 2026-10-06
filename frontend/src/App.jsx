import React, { useEffect, useState } from "react";
import { api } from './api';
import VisitorForm from './components/VisitorForm';
import VisitorTable from './components/VisitorTable';

export default function App() {
  const [visitors,setVisitors]=useState([]); const [editing,setEditing]=useState(null); const [search,setSearch]=useState(''); const [loading,setLoading]=useState(true); const [message,setMessage]=useState(''); const [error,setError]=useState('');
  const show = (m,err=false)=>{err?setError(m):setMessage(m); setTimeout(()=>{setMessage('');setError('')},3000)};
  const load = async(q='')=>{try{setLoading(true); const r=await api.get(q?`/visitors/search?query=${encodeURIComponent(q)}`:'/visitors'); setVisitors(r.data)}catch(e){show(e.response?.data?.message||'Unable to load visitors',true)}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  useEffect(()=>{const t=setTimeout(()=>load(search),300); return()=>clearTimeout(t)},[search]);
  const submit=async(data)=>{try{if(editing) await api.put(`/visitors/${editing._id}`,data); else await api.post('/visitors',data); setEditing(null); await load(search); show(editing?'Visitor updated successfully':'Visitor added successfully')}catch(e){show(e.response?.data?.message||'Operation failed',true)}};
  const del=async(v)=>{if(!window.confirm(`Delete visitor ${v.visitorName}?`))return; try{await api.delete(`/visitors/${v._id}`); await load(search); show('Visitor deleted successfully')}catch(e){show(e.response?.data?.message||'Delete failed',true)}};
  return <div><header className="hero"><div><h1>Employee Visitor Management</h1><p>Digital visitor records for reception and administration</p></div><div className="badge">MERN STACK</div></header><main>
    {(message||error)&&<div className={`alert ${error?'error':'success'}`}>{error||message}</div>}
    <VisitorForm editingVisitor={editing} onSubmit={submit} onCancel={()=>setEditing(null)}/>
    <section className="search card"><div><h2>Search Visitors</h2><p>Search by visitor name or mobile number.</p></div><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search visitor..."/></section>
    <VisitorTable visitors={visitors} onEdit={setEditing} onDelete={del} loading={loading}/>
  </main><footer>Employee Visitor Management System • MERN Stack Project</footer></div>;
}
