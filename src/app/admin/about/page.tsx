import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAdminProfiles, saveProfile, deleteProfile } from "./actions";
import { ProfilePhotoField } from "@/components/admin/ProfilePhotoField";

export default async function AdminAboutPage() {
  const session = await getSession();
  if (!session?.user || session.user.email.toLowerCase() !== "eugenekarewa223@gmail.com") redirect("/admin/login");
  const profiles = await getAdminProfiles();

  return (
    <main className="surface-grid min-h-screen bg-cream-bg px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-brand">Zollani / Admin</p><h1 className="mt-2 text-4xl font-black text-brand-dark">About profiles</h1><p className="mt-2 text-sm text-brand-muted">Manage the owner and people customers see on the About page.</p></div>
          <a href="/about" className="rounded-xl border border-cream-border bg-white px-4 py-3 text-sm font-bold text-brand-dark">View About page</a>
        </div>
        <form action={saveProfile} className="mt-8 grid gap-4 rounded-3xl border border-teal-brand/20 bg-white p-6 shadow-sm md:grid-cols-2">
          <h2 className="md:col-span-2 text-xl font-black text-brand-dark">Add a profile</h2>
          <input name="name" required placeholder="Full name" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
          <input name="role" required placeholder="Role / title" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
          <ProfilePhotoField />
          <textarea name="bio" required placeholder="Short professional biography" className="min-h-28 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" />
          <select name="profileType" defaultValue="team" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3"><option value="team">Team member</option><option value="owner">Owner / founder</option></select>
          <input name="sortOrder" type="number" defaultValue="0" placeholder="Display order" className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" />
          <label className="flex items-center gap-2 text-sm font-bold text-brand-dark md:col-span-2"><input name="isPublished" type="checkbox" defaultChecked /> Publish on About page</label>
          <button className="rounded-xl bg-teal-brand px-5 py-3 font-bold text-white md:col-span-2">Add profile</button>
        </form>
        <div className="mt-8 grid gap-5">
          {profiles.map((profile) => <form key={profile.id} action={saveProfile} className="grid gap-4 rounded-3xl border border-cream-border bg-white p-6 shadow-sm md:grid-cols-2"><input type="hidden" name="id" value={profile.id} /><h2 className="md:col-span-2 text-lg font-black text-brand-dark">{profile.name}</h2><input name="name" defaultValue={profile.name} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" /><input name="role" defaultValue={profile.role} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" /><ProfilePhotoField defaultValue={profile.imageUrl} /><textarea name="bio" defaultValue={profile.bio} className="min-h-28 rounded-xl border border-cream-border bg-cream-surface px-4 py-3 md:col-span-2" /><select name="profileType" defaultValue={profile.profileType} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3"><option value="team">Team member</option><option value="owner">Owner / founder</option></select><input name="sortOrder" type="number" defaultValue={profile.sortOrder} className="rounded-xl border border-cream-border bg-cream-surface px-4 py-3" /><label className="flex items-center gap-2 text-sm font-bold text-brand-dark"><input name="isPublished" type="checkbox" defaultChecked={profile.isPublished} /> Published</label><div className="flex gap-3 md:col-span-2"><button className="rounded-xl bg-teal-brand px-5 py-3 font-bold text-white">Save changes</button><button formAction={deleteProfile} className="rounded-xl border border-red-200 px-5 py-3 font-bold text-red-700">Delete</button></div></form>)}
          {profiles.length === 0 && <div className="rounded-3xl border border-dashed border-cream-border bg-white p-10 text-center text-sm text-brand-muted">No profiles yet. Add the owner and team above.</div>}
        </div>
      </div>
    </main>
  );
}
