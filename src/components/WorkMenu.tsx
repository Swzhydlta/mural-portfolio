"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function WorkMenu({
  folders,
}: {
  folders: { slug: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative group">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="hover:underline cursor-pointer border border-black px-2 py-1"
      >
        work
      </button>
      {folders.length > 0 && (
        <div
          className={`absolute right-0 top-full group-hover:block bg-background border border-black min-w-32 z-10 ${
            open ? "block" : "hidden"
          }`}
        >
          {folders.map((folder) => (
            <Link
              key={folder.slug}
              href={`/work/${folder.slug}`}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:underline whitespace-nowrap"
            >
              {folder.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
