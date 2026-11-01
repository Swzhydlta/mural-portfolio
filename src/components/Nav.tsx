import Link from "next/link";
import { WorkMenu } from "@/components/WorkMenu";
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
    <nav className="sticky top-0 z-20 bg-background w-full flex items-center justify-between p-4 border border-black">
      <Link href="/" className="cursor-pointer border border-black px-2 py-1">
        Daniel Mark Nel
      </Link>
      <div className="flex items-center space-x-4">
        <WorkMenu folders={folders} />
        <Link
          href="/about"
          className="hover:underline border border-black px-2 py-1"
        >
          about
        </Link>
      </div>
    </nav>
  );
}
