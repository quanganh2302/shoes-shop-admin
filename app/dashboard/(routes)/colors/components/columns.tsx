"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { cn } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Color name",
  },
  {
    cell: ({ row }) => (
      <div
        style={{ backgroundColor: row.original.value }}
        className={cn(
          "w-8 h-8 rounded-full ",
          row.original.name === "White" ? "border border-[#E5E5E5]" : ""
        )}
      ></div>
    ),
    header: "Color value",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Action",
  },
];
