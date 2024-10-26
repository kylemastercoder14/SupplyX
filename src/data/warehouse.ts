/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createWarehouse,
  deleteWarehouse,
  getAllWarehouse,
  updateWarehouse,
} from "@/actions/warehouse";
import { WarehouseValidators } from "@/lib/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetWarehouse() {
  return useQuery({
    queryFn: async () => getAllWarehouse(),
    queryKey: ["warehouses"],
  });
}

export function useSaveWarehouse(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof WarehouseValidators>) => {
      if (initialData) {
        return updateWarehouse(values, initialData.id);
      } else {
        return createWarehouse(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteWarehouse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (warehouseId: string) => {
      return deleteWarehouse(warehouseId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
