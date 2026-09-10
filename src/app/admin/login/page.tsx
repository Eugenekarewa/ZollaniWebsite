"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showResetHelp, setShowResetHelp] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const result = await authClient.signIn.email({ email, password });
    if (result.error) { setError("Those details could not be verified."); return; }
    router.push("/admin/shop");
    router.refresh();
  }

  return <main className="surface-grid flex min-h-screen items-center justify-center bg-cream-bg px-4 py-16"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-cream-border bg-white p-8 shadow-xl"><p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-brand">Zollani / Admin</p><h1 className="mt-3 text-3xl font-black text-brand-dark">Shop access</h1><p className="mt-3 text-sm leading-6 text-brand-muted">Sign in to list products, update photos, and manage what is available in the shop.</p><div className="mt-8 grid gap-4"><label className="grid gap-2 text-sm font-bold text-brand-dark">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-cream-border bg-cream-surface px-3 py-3 font-normal outline-none focus:border-teal-brand" /></label><label className="grid gap-2 text-sm font-bold text-brand-dark">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-cream-border bg-cream-surface px-3 py-3 font-normal outline-none focus:border-teal-brand" /></label></div>{error ? <p role="alert" className="mt-4 text-sm font-bold text-coral-brand">{error}</p> : null}<button className="mt-6 w-full rounded-xl bg-teal-deep px-4 py-3 font-bold text-white transition hover:bg-teal-brand">Sign in</button><button type="button" onClick={() => setShowResetHelp((current) => !current)} className="mt-4 w-full text-sm font-bold text-teal-brand underline underline-offset-4">Forgot your password?</button>{showResetHelp ? <div className="mt-4 rounded-2xl border border-coral-brand/25 bg-coral-brand/5 p-4 text-sm leading-6 text-brand-muted"><p className="font-bold text-brand-dark">Manual password reset</p><p className="mt-2">Password recovery email is not enabled for this admin area. Please contact the site administrator to reset the admin account securely through the project settings. Do not send your password by email or WhatsApp.</p></div> : null}</form></main>;
}
