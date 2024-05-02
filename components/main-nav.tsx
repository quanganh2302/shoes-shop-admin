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
      href: `/dashboard/roles`,
      label: "Roles",
      active: pathname === `/dashboard/roles`,
    },
    {
      href: `/dashboard/users`,
      label: "User",
      active: pathname === `/dashboard/users`,
    },
    {
      href: `/dashboard/genders`,
      label: "Genders",
      active: pathname === `/dashboard/genders`,
    },
    {
      href: `/dashboard/categories`,
      label: "Categories",
      active: pathname === `/dashboard/categories`,
    },

    {
      href: `/dashboard/colors`,
      label: "Color",
      active: pathname === `/dashboard/colors`,
    },
    {
      href: `/dashboard/brands`,
      label: "Brand",
      active: pathname === `/dashboard/brands`,
    },
    {
      href: `/dashboard/styles`,
      label: "Style",
      active: pathname === `/dashboard/styles`,
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
      href: `/dashboard/sizes`,
      label: "Size",
      active: pathname === `/dashboard/sizes`,
    },
    {
      href: `/dashboard/promotions`,
      label: "Promotions",
      active: pathname === `/dashboard/promotions`,
    },
    {
      href: `/dashboard/collections`,
      label: "Collections",
      active: pathname === `/dashboard/collections`,
    },
    {
      href: `/dashboard/products-collections`,
      label: "Product-Collection",
      active: pathname === `/dashboard/products-collections`,
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
