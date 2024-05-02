"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductCollectionColumn = {
  id: string;
  productId: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductCollectionColumn>[] = [
  {
    accessorKey: "productId",
    header: "Product Id",
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
