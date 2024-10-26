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
import { getAllRawMaterials } from "@/actions/raw-material";
import RawMaterialClient from "./_component/client";

const AddRawMaterials = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["rawMaterials"],
    queryFn: getAllRawMaterials,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="px-5">
      <TableHeader label="Add Raw Material" />
      <Card>
        <CardHeader>
          <CardTitle>Raw Materials List</CardTitle>
          <CardDescription>
            This section allows you to add new warehouses, view existing ones,
            and track inventory levels to ensure a smooth production process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <RawMaterialClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddRawMaterials;
