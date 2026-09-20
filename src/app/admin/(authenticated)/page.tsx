import Link from "next/link";
import { getFolders } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const folders = await getFolders();

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      <section>
        <h1 className="text-xl mb-4">Folders</h1>
        {folders.length === 0 && <p>No folders yet.</p>}
        <ul className="flex flex-col gap-2">
          {folders.map((folder) => (
            <li
              key={folder.id}
              className="flex items-center justify-between border border-foreground/10 px-3 py-2"
            >
              <Link href={`/admin/${folder.slug}`} className="hover:underline">
                {folder.name}
              </Link>
              <form
                action={`/api/admin/folders/${folder.id}/delete`}
                method="post"
              >
                <button
                  type="submit"
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg mb-2">New folder</h2>
        <form action="/api/admin/folders" method="post" className="flex gap-2">
          <input
            type="text"
            name="name"
            placeholder="e.g. 2019"
            required
            className="border border-foreground/20 px-3 py-2 bg-transparent flex-1"
          />
          <button
            type="submit"
            className="border border-foreground/20 px-3 py-2 hover:underline cursor-pointer"
          >
            Create
          </button>
        </form>
      </section>
    </div>
  );
}
