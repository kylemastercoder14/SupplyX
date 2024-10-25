/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStaff, deleteStaff, getAllStaff, updateStaff } from "@/actions/staff";
import { StaffValidators } from "@/lib/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetStaff() {
  return useQuery({
    queryFn: async () => getAllStaff(),
    queryKey: ["staffs"],
  });
}

export function useSaveStaff(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof StaffValidators>) => {
      if (initialData) {
        return updateStaff(values, initialData.id);
      } else {
        return createStaff(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["staffs"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (staffId: string) => {
      return deleteStaff(staffId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["staffs"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
