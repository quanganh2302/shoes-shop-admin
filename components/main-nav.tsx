"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { components } from "@/lib/style";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const routes = [
    {
      href: `/dashboard/settings`,
      label: "Settings",
      active: pathname === `/dashboard/settings`,
    },
    {
      href: `/dashboard/users`,
      label: "User",
      active: pathname === `/dashboard/users`,
    },
    {
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/dashboard/categories`,
    },
    {
      href: `/dashboard/collections`,
      label: "Collections",
      active: pathname === `/dashboard/collections`,
    },
    {
      href: `/dashboard/products`,
      label: "Products",
      active: pathname === `/dashboard/products`,
    },
    {
      href: `/dashboard/product-items`,
      label: "Product Items",
      active: pathname === `/dashboard/product-items`,
    },
    {
      href: `/dashboard/variations`,
      label: "Variations",
      active: pathname === `/dashboard/variations`,
    },
    {
      href: `/dashboard/options`,
      label: "Options",
      active: pathname === `/dashboard/options`,
    },
    {
      href: `/dashboard/product-configurations`,
      label: "Product-configurations",
      active: pathname === `/dashboard/product-configurations`,
    },
    {
      href: `/dashboard/promotions`,
      label: "Promotions",
      active: pathname === `/dashboard/promotions`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            " transition-colors hover:text-primary",
            components.navLink,
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
