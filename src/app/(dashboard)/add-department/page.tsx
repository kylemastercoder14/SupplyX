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
import { getAllDepartment } from "@/actions/department";
import DepartmentClient from "./_component/client";

const Department = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["department"],
    queryFn: getAllDepartment,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="px-5">
      <TableHeader label="Add Department" />
      <Card>
        <CardHeader>
          <CardTitle>Department List</CardTitle>
          <CardDescription>Here, you&apos;ll find a comprehensive list of all departments within the organization. You can add, view, and manage department details to keep information up-to-date and organized.</CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <DepartmentClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Department;
