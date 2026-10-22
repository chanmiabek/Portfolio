import Link from "next/link";
import { loginAction } from "./actions";

export const metadata = { title: "Admin login" };

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return <main className="flex min-h-screen items-center justify-center bg-[#efede7] px-5 py-12">

    <div className="w-full max-w-md rounded-3xl border border-[#e1ddd4] bg-white p-8 shadow-sm sm:p-10">
      <Link href="/" className="text-xl font-black tracking-tight">My<span className="text-[#a96f4c]">Portfolio.</span>
      </Link>

      <p className="section-eyebrow mt-10">Content management</p>

      <h1 className="mt-2 text-3xl font-black tracking-tight">Welcome back</h1>
      
      <p className="mt-3 text-sm leading-6 text-[#73716c]">Sign in to manage your portfolio content.</p>

      {params.error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">Invalid email or password.</p>}

      <form action={loginAction} className="mt-7 grid gap-5">
        <div className="form-field">
          <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" /></div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
        <button className="btn-primary mt-2 w-full">Sign in to dashboard</button>
      </form>
      <p className="mt-6 text-center text-sm text-[#73716c]">
        <Link href="/" className="underline underline-offset-4">← Back to portfolio</Link>
        </p>
    </div>
  </main>;
}
