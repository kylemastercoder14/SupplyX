"use client";

import React from "react";
import { columns, RawMaterialColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetRawMaterials } from "@/data/raw-material";

const RawMaterialClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: rawMaterialData, error, isLoading } = useGetRawMaterials();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: RawMaterialColumn[] =
    rawMaterialData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      imageUrl: item.imageUrl,
      warehouseId: item.warehouse.name,
      unit: item.unit,
      used: item.used,
      stock: item.stock,
      buffer: item.buffer || 0,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DataTable
        loading={isLoading}
        searchKey="name"
        columns={columns}
        data={formattedData}
      />
    </>
  );
};

export default RawMaterialClient;
