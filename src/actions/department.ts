/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { DepartmentValidators } from "@/lib/validators";
import { z } from "zod";

export const getAllDepartment = async () => {
  try {
    const data = await db.department.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: true,
      },
    });

    if (!data) {
      return { error: "No department found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createDepartment = async (
  values: z.infer<typeof DepartmentValidators>
) => {
  const validatedField = DepartmentValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, description } = validatedField.data;

  try {
    // Fetch the current count of departments
    const departmentCount = await db.department.count();
    // Increment count to get the next ID number
    const newIdNumber = departmentCount + 1;
    // Generate department ID in the format 'DEPT-xxxx'
    const departmentId = `DEPT-${String(newIdNumber).padStart(4, "0")}`;

    const data = await db.department.create({
      data: {
        id: departmentId,
        name,
        description: description || "",
      },
    });

    return { success: "Department created successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to create department. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateDepartment = async (
  values: z.infer<typeof DepartmentValidators>,
  departmentId: string
) => {
  if (!departmentId) {
    return { error: "Department ID is required." };
  }

  const validatedField = DepartmentValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, description } = validatedField.data;

  try {
    const data = await db.department.update({
      where: {
        id: departmentId,
      },
      data: {
        name,
        description: description || "",
      },
    });

    return { success: "Department updated successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to update department. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteDepartment = async (departmentId: string) => {
  if (!departmentId) {
    return { error: "Department ID is required." };
  }

  try {
    const data = await db.department.delete({
      where: {
        id: departmentId,
      },
    });

    return { success: "Department deleted successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to delete department. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
