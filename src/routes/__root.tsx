import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

// The app shell: anything rendered here (nav, footer, providers) appears on every page.
// <Outlet /> is where the matched page renders.
function RootLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-amber-50 px-4 py-8 text-stone-800 dark:bg-stone-900 dark:text-stone-100">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl dark:bg-amber-500/10" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-500/10" />
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
