/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type WarehouseColumn = {
  id: string;
  name: string;
  rawMaterials: string;
  description: string;
  address: string;
  createdAt: string;
};

export const columns: ColumnDef<WarehouseColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "rawMaterials",
    header: "Raw Materials",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span title={row.original.description}>
        {row.original.description.length > 120
          ? `${row.original.description.slice(0, 120)}...`
          : row.original.description}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
