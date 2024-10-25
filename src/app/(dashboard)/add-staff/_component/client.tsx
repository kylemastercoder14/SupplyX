"use client";

import React from "react";
import { columns, StaffColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetStaff } from "@/data/staff";

const StaffClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: staffData, error, isLoading } = useGetStaff();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: StaffColumn[] =
    staffData?.data?.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      address: item.address,
      sex: item.sex,
      birthdate: format(item.birthdate, "MMMM dd, yyyy"),
      contactNumber: item.contactNumber,
      department: item.department.name,
      position: item.position.name,
      email: item.email,
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

export default StaffClient;
