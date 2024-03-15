"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OptionColumn = {
  id: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<OptionColumn>[] = [
  {
    accessorKey: "value",
    header: "Option value",
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
