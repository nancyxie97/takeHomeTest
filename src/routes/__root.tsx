import NavBar from "@/components/NavBar";
import { useDarkMode } from "@/stores/DarkModeStore";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  useDarkMode();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });
  return (
    <div className="bg-background text-foreground">
      <NavBar />
      <div key={pathname} className="animate-fade-in h-full p-6 pt-2">
        <Outlet />
      </div>
    </div>
  );
}
