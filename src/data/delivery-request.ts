/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllDeliveryRequest } from "@/actions/delivery-request";
import {
    createRawMaterial,
    deleteRawMaterial,
    updateRawMaterial,
  } from "@/actions/raw-material";
  import { RawMaterialValidators } from "@/lib/validators";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import { toast } from "sonner";
  import { z } from "zod";
  
  export function useGetDeliveryRequest() {
    return useQuery({
      queryFn: async () => getAllDeliveryRequest(),
      queryKey: ["deliveries"],
    });
  }
  
  export function useSaveRawMaterial(initialData?: any) {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (values: z.infer<typeof RawMaterialValidators>) => {
        if (initialData) {
          return updateRawMaterial(values, initialData.id);
        } else {
          return createRawMaterial(values);
        }
      },
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.success);
          queryClient.invalidateQueries({ queryKey: ["rawMaterials"] });
        }
      },
      onError: (error: any) => {
        toast.error(error.message || "An error occurred");
      },
    });
  }
  
  export function useDeleteRawMaterial() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (rawMaterialId: string) => {
        return deleteRawMaterial(rawMaterialId);
      },
      onSuccess: (data) => {
        if (data?.success) {
          toast.success(data.success);
          queryClient.invalidateQueries({ queryKey: ["rawMaterials"] });
        }
      },
      onError: (error: any) => {
        toast.error(error.message || "An error occurred");
      },
    });
  }
  