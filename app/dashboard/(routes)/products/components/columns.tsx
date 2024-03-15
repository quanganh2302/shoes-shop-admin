"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  imageURL: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Product name",
  },
  {
    accessorKey: "imageURL",
    header: "Image",
    cell: ({ row }) => (
      <div
        className="w-10 h-10 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${row.original.imageURL})` }}
      ></div>
    ),
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
