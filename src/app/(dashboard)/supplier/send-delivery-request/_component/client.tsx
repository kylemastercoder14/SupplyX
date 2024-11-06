"use client";

import React from "react";
import { columns, DeliverRequestColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetDeliveryRequest } from "@/data/delivery-request";

const DeliveryRequestClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: deliveriesData, error, isLoading } = useGetDeliveryRequest();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: DeliverRequestColumn[] =
    deliveriesData?.data?.map((item) => ({
      id: item.id,
      name: item.rawMaterial.name,
      imageUrl: item.rawMaterial.imageUrl,
      unit: item.rawMaterial.unit,
      quantity: item.quantity,
      status: item.status,
      dateReceived: format(item.dateReceived, "MMMM dd, yyyy"),
      dateSent: item.dateSent ? format(item.dateSent, "MMMM dd, yyyy") : "N/A",
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

export default DeliveryRequestClient;
