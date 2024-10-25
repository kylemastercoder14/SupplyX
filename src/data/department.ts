/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDepartment, deleteDepartment, getAllDepartment, updateDepartment } from "@/actions/department";
import { DepartmentValidators } from "@/lib/validators";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export function useGetDepartment() {
  return useQuery({
    queryFn: async () => getAllDepartment(),
    queryKey: ["departments"],
  });
}

export function useSaveDepartment(initialData?: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof DepartmentValidators>) => {
      if (initialData) {
        return updateDepartment(values, initialData.id);
      } else {
        return createDepartment(values);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["departments"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (departmentId: string) => {
      return deleteDepartment(departmentId);
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["departments"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });
}
