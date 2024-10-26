"use client";

import React from "react";
import { columns, WarehouseColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetWarehouse } from "@/data/warehouse";

const WarehouseClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: warehouseData, error, isLoading } = useGetWarehouse();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: WarehouseColumn[] =
    warehouseData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      rawMaterials: item.rawMaterial.length.toString(),
      description: item.description || "N/A",
      address: item.address,
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

export default WarehouseClient;
