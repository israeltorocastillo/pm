"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const BASE_ITEMS = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/conocimiento", label: "Conocimiento" },
];

export function NavLinks({ showAdmin }: { showAdmin: boolean }) {
  const pathname = usePathname();
  const items = showAdmin ? [...BASE_ITEMS, { href: "/admin", label: "Admin" }] : BASE_ITEMS;

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
