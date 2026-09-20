import { sql } from "@vercel/postgres";

export type Folder = {
  id: number;
  slug: string;
  name: string;
  createdAt: string;
};

export type ImageRecord = {
  id: number;
  folderId: number;
  url: string;
  pathname: string;
  alt: string;
  createdAt: string;
};

export async function getFolders(): Promise<Folder[]> {
  const { rows } = await sql<Folder>`
    SELECT id, slug, name, created_at as "createdAt"
    FROM folders
    ORDER BY created_at ASC
  `;
  return rows;
}

export async function getFolderBySlug(slug: string): Promise<Folder | null> {
  const { rows } = await sql<Folder>`
    SELECT id, slug, name, created_at as "createdAt"
    FROM folders
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getFolderById(id: number): Promise<Folder | null> {
  const { rows } = await sql<Folder>`
    SELECT id, slug, name, created_at as "createdAt"
    FROM folders
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function createFolder(
  name: string,
  slug: string,
): Promise<Folder> {
  const { rows } = await sql<Folder>`
    INSERT INTO folders (name, slug)
    VALUES (${name}, ${slug})
    RETURNING id, slug, name, created_at as "createdAt"
  `;
  return rows[0];
}

export async function deleteFolder(id: number): Promise<void> {
  await sql`DELETE FROM folders WHERE id = ${id}`;
}

export async function getImagesByFolderId(
  folderId: number,
): Promise<ImageRecord[]> {
  const { rows } = await sql<ImageRecord>`
    SELECT id, folder_id as "folderId", url, pathname, alt, created_at as "createdAt"
    FROM images
    WHERE folder_id = ${folderId}
    ORDER BY created_at ASC
  `;
  return rows;
}

export async function addImage(params: {
  folderId: number;
  url: string;
  pathname: string;
  alt: string;
}): Promise<ImageRecord> {
  const { rows } = await sql<ImageRecord>`
    INSERT INTO images (folder_id, url, pathname, alt)
    VALUES (${params.folderId}, ${params.url}, ${params.pathname}, ${params.alt})
    RETURNING id, folder_id as "folderId", url, pathname, alt, created_at as "createdAt"
  `;
  return rows[0];
}

export async function getImageById(id: number): Promise<ImageRecord | null> {
  const { rows } = await sql<ImageRecord>`
    SELECT id, folder_id as "folderId", url, pathname, alt, created_at as "createdAt"
    FROM images
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function deleteImage(id: number): Promise<void> {
  await sql`DELETE FROM images WHERE id = ${id}`;
}

export async function countRecentLoginAttempts(
  ip: string,
  windowMinutes: number,
): Promise<number> {
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const { rows } = await sql<{ count: number }>`
    SELECT count(*)::int AS count
    FROM login_attempts
    WHERE ip = ${ip} AND attempted_at > ${since}
  `;
  return rows[0]?.count ?? 0;
}

export async function recordLoginAttempt(ip: string): Promise<void> {
  await sql`INSERT INTO login_attempts (ip) VALUES (${ip})`;
  // Opportunistic cleanup so this table doesn't grow unbounded.
  await sql`DELETE FROM login_attempts WHERE attempted_at < now() - interval '1 day'`;
}
