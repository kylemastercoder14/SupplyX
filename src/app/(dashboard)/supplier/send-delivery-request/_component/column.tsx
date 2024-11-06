/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export type DeliverRequestColumn = {
  id: string;
  name: string;
  imageUrl: string;
  unit: string;
  quantity: number;
  dateReceived: string;
  dateSent: string;
  status: string;
};

export const columns: ColumnDef<DeliverRequestColumn>[] = [
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
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dateReceived",
    header: "Date Received",
  },
  {
    accessorKey: "dateSent",
    header: "Date Sent",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
