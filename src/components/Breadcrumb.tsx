import { Link, useMatches } from "@tanstack/react-router";
import { humanizeIdentifier } from "@/utils/humanize";

export default function BreadCrumb() {
  const matches = useMatches();

  // Build breadcrumbs from route matches
  const breadcrumbs = matches
    .map((match) => {
      const pathname = match.pathname || "/";
      const segments = pathname.split("/").filter(Boolean);
      const label =
        segments.length === 0 ? "Home" : segments[segments.length - 1];
      return {
        label,
        href: pathname,
      };
    })
    .filter(
      (crumb, index, self) =>
        // Remove duplicates (e.g. multiple 'Home' entries)
        index === 0 || crumb.href !== self[index - 1].href,
    );

  return (
    <div className="flex pt-2 items-center text-gray-400 mx-4 cursor-pointer select-none space-x-2">
      {breadcrumbs.length > 1 &&
        breadcrumbs.map(({ label, href }, i) => (
          <div key={href} className="flex items-center space-x-2">
            <Link to={href}>
              <p className="flex hover:underline text-sm my-auto capitalize">
                {humanizeIdentifier(decodeURIComponent(label))}
              </p>
            </Link>
            {i + 1 < breadcrumbs.length && <p>{"›"}</p>}
          </div>
        ))}
    </div>
  );
}
