"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CollectionColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<CollectionColumn>[] = [
  {
    accessorKey: "name",
    header: "Collection name",
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
