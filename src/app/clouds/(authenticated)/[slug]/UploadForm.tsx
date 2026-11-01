"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function UploadForm({ folderId }: { folderId: number }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFilesSelected(files: FileList) {
    setIsUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
        });

        const response = await fetch("/api/admin/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            folderId,
            url: blob.url,
            pathname: blob.pathname,
            alt: file.name,
          }),
        });
        if (!response.ok) throw new Error("Failed to save uploaded image");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        disabled={isUploading}
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            handleFilesSelected(event.target.files);
          }
        }}
      />
      {isUploading && <p>Uploading…</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
