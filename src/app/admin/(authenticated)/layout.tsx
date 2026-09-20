export default function AuthenticatedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="w-full flex items-center justify-between p-4 border-b border-foreground/10">
        <a href="/admin" className="hover:underline">
          admin
        </a>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="hover:underline cursor-pointer">
            log out
          </button>
        </form>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
