export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-sm mx-auto mt-24 px-4">
      <h1 className="text-xl mb-4">Admin login</h1>
      {error && <p className="text-red-600 mb-4">Incorrect password.</p>}
      <form
        action="/api/admin/login"
        method="post"
        className="flex flex-col gap-3"
      >
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          // biome-ignore lint/a11y/noAutofocus: single-field login form, autofocus is expected here
          autoFocus
          className="border border-foreground/20 px-3 py-2 bg-transparent"
        />
        <button
          type="submit"
          className="border border-foreground/20 px-3 py-2 hover:underline cursor-pointer"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
