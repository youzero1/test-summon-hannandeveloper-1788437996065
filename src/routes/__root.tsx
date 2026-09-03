import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

// The app shell: anything rendered here (nav, footer, providers) appears on every page.
// <Outlet /> is where the matched page renders.
function RootLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-8">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl" />
      <main className="relative z-10 w-full flex justify-center">
        <Outlet />
      </main>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-slate-100">
      <p className="text-lg">This page does not exist.</p>
      <Link to="/" className="text-sm underline underline-offset-4">
        Go to the home page
      </Link>
    </div>
  );
}
