import Link from "next/link";
import { getFolders } from "@/lib/db";

export async function Nav() {
  let folders: { slug: string; name: string }[] = [];
  try {
    folders = await getFolders();
  } catch {
    // DB not provisioned/configured yet (e.g. local dev before setup) —
    // render the nav without a folder list rather than crashing the page.
    folders = [];
  }

  return (
    <nav className="w-full flex items-center justify-between p-4">
      <div>Daniel Mark Nel</div>
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <button type="button" className="hover:underline cursor-pointer">
            work
          </button>
          {folders.length > 0 && (
            <div className="absolute left-0 top-full hidden group-hover:block bg-background border border-foreground/10 min-w-32 z-10">
              {folders.map((folder) => (
                <Link
                  key={folder.slug}
                  href={`/work/${folder.slug}`}
                  className="block px-4 py-2 hover:underline whitespace-nowrap"
                >
                  {folder.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <a href="/" className="hover:underline">
          contact
        </a>
      </div>
    </nav>
  );
}
