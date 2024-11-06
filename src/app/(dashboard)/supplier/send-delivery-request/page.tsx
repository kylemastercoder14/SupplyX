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
import DeliveryRequestClient from "./_component/client";
import { getAllDeliveryRequest } from "@/actions/delivery-request";

const SendDeliveryRequest = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["deliveries"],
    queryFn: getAllDeliveryRequest,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="px-5">
      <TableHeader label="Send Delivery Rquest" />
      <Card>
        <CardHeader>
          <CardTitle>Delivery Request List</CardTitle>
          <CardDescription>
            This section allows you to add new warehouses, view existing ones,
            and track inventory levels to ensure a smooth production process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <DeliveryRequestClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default SendDeliveryRequest;
