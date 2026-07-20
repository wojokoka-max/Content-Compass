"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Werdykt" },
  { href: "/okazje", label: "Okazje" },
  { href: "/klastry", label: "Klastry" },
  { href: "/trendy", label: "Trendy" },
  { href: "/konkurencja", label: "Konkurencja" },
  { href: "/planer", label: "Planer sezonowy" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" fill="none" stroke="#8fd8ff" strokeWidth="1" />
              <path d="M7 2.4 L8.4 7 L7 11.6 L5.6 7 Z" fill="#ffd38a" />
            </svg>
          </span>
          Content Compass
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={path === l.href ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
