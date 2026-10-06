import React, { useState, useEffect } from "react";

const emptyForm = { visitorName:'', mobileNumber:'', email:'', organization:'', personToMeet:'', purpose:'', visitDateTime:'', status:'Checked In' };

export default function VisitorForm({ editingVisitor, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  useEffect(() => setForm(editingVisitor ? {...editingVisitor, visitDateTime: editingVisitor.visitDateTime ? new Date(editingVisitor.visitDateTime).toISOString().slice(0,16) : ''} : emptyForm), [editingVisitor]);
  const change = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = e => { e.preventDefault(); onSubmit(form); if (!editingVisitor) setForm(emptyForm); };
  return <section className="card">
    <div className="section-title"><div><h2>{editingVisitor ? 'Update Visitor' : 'Add New Visitor'}</h2><p>Enter the visitor information below.</p></div>{editingVisitor && <button className="btn secondary" onClick={onCancel}>Cancel Edit</button>}</div>
    <form onSubmit={submit}>
      <div className="grid">
        {[
          ['visitorName','Visitor Name','text',true],['mobileNumber','Mobile Number','tel',true],['email','Email Address','email',false],['organization','Organization / College','text',false],['personToMeet','Person to Meet','text',true],['purpose','Purpose of Visit','text',true]
        ].map(([name,label,type,required])=><label key={name}>{label}<input name={name} type={type} value={form[name]} onChange={change} required={required} placeholder={`Enter ${label.toLowerCase()}`} /></label>)}
        <label>Date & Time<input name="visitDateTime" type="datetime-local" value={form.visitDateTime} onChange={change} required /></label>
        <label>Status<select name="status" value={form.status} onChange={change}><option>Checked In</option><option>Checked Out</option></select></label>
      </div>
      <button className="btn primary" type="submit">{editingVisitor ? 'Update Visitor' : 'Add Visitor'}</button>
    </form>
  </section>;
}
