"use client";
import {FormEvent,useState} from "react";
import {createClient} from "@/lib/supabase/client";
export default function ChangePassword(){
 const [currentPassword,setCurrentPassword]=useState(""),[newPassword,setNewPassword]=useState(""),[confirmPassword,setConfirmPassword]=useState(""),[status,setStatus]=useState(""),[saving,setSaving]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setStatus("");
  if(newPassword.length<8){setStatus("Your new password must be at least 8 characters long.");return}
  if(newPassword!==confirmPassword){setStatus("Your new passwords do not match.");return}
  setSaving(true);const s=createClient();
  const {error}=await s.auth.updateUser({password:newPassword,current_password:currentPassword});
  setSaving(false);if(error){setStatus(error.message);return}
  setCurrentPassword("");setNewPassword("");setConfirmPassword("");setStatus("Password changed successfully.");
 }
 return <section className="password-card"><p className="eye">ACCOUNT SECURITY</p><h2>CHANGE VAULT PASSWORD</h2><p className="password-help">Enter your current password and choose a new password for the Collection Manager.</p><form onSubmit={submit} className="password-form"><label>CURRENT PASSWORD<input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} required autoComplete="current-password"/></label><label>NEW PASSWORD<input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required minLength={8} autoComplete="new-password"/></label><label>CONFIRM NEW PASSWORD<input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required minLength={8} autoComplete="new-password"/></label><button className="btn" type="submit" disabled={saving}>{saving?"UPDATING...":"CHANGE PASSWORD"}</button></form>{status&&<p className="password-status">{status}</p>}</section>
}
