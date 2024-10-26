/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export type RawMaterialColumn = {
  id: string;
  name: string;
  imageUrl: string;
  unit: string;
  stock: number;
  warehouseId: string;
  buffer: number;
  used: number;
  createdAt: string;
};

export const columns: ColumnDef<RawMaterialColumn>[] = [
  {
    accessorKey: "name",
    header: "Raw Material",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.imageUrl ? (
          <Image
            src={row.original.imageUrl}
            alt="Image"
            width={40}
            height={40}
            className="object-cover rounded-md"
          />
        ) : (
          <Avatar className="w-10 h-10 object-cover rounded-md">
            <AvatarFallback className="rounded-md">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">({row.original.unit})</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "warehouseId",
    header: "Warehouse",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "buffer",
    header: "Buffer",
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
