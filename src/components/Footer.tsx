const links = [
  { label: "instagram", href: "https://www.instagram.com/__dnel/" },
  { label: "email", href: "mailto:dmMe@hi.insta" },
];

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-between p-4 border border-black text-sm">
      <span>&copy; {new Date().getFullYear()} Daniel Mark Nel</span>
      <div className="flex items-center space-x-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="hover:underline border border-black px-2 py-1"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
