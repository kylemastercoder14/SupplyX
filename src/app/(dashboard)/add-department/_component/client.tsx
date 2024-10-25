"use client";

import React from "react";
import { columns, DepartmentColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetDepartment } from "@/data/department";

const DepartmentClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: departmentData, error, isLoading } = useGetDepartment();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: DepartmentColumn[] =
    departmentData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      users: item.user.length.toString(),
      description: item.description ?? "N/A",
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

export default DepartmentClient;
