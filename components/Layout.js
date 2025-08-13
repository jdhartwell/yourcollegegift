// components/Layout.js
import Head from "next/head";
import Link from "next/link";

export default function Layout({ title = "YourCollegeGift.com", description = "College gift ideas powered by Fanatics", children }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="container-wide flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-black text-white grid place-content-center font-bold">YC</div>
            <span className="font-semibold tracking-tight">YourCollegeGift<span className="text-brand-orange">.com</span></span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link className="hover:underline" href="/gift-ideas">Gift Ideas</Link>
            <Link className="hover:underline" href="/about">About</Link>
          </nav>
        </div>
      </header>

      <main className="container-wide py-8">{children}</main>

      <footer className="mt-16 border-t border-black/5 bg-white">
        <div className="container-wide py-10 text-sm text-black/70">
          <p>© {new Date().getFullYear()} YourCollegeGift.com — An affiliate site; we may earn from qualifying purchases.</p>
        </div>
      </footer>
    </div>
  );
}