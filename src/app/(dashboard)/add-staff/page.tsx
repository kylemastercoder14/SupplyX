import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import TableHeader from "./_component/table-header";
import { getAllStaff } from "@/actions/staff";
import StaffClient from "./_component/client";

const Staff = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["staffs"],
    queryFn: getAllStaff,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="px-5">
      <TableHeader href="/add-staff/new" label="Add Staff" />
      <Card>
        <CardHeader>
          <CardTitle>Staff Record</CardTitle>
          <CardDescription>
            This section contains a comprehensive record of all staff members,
            including personal details, roles, and employment history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <StaffClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Staff;
