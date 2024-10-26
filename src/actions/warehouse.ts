/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { WarehouseValidators } from "@/lib/validators";
import { z } from "zod";

export const getAllWarehouse = async () => {
  try {
    const data = await db.warehouse.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        rawMaterial: true,
      },
    });

    if (!data) {
      return { error: "No warehouse found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createWarehouse = async (
  values: z.infer<typeof WarehouseValidators>
) => {
  const validatedField = WarehouseValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, description, address } = validatedField.data;

  try {
    // Fetch the current count of departments
    const warehouseCount = await db.warehouse.count();
    // Increment count to get the next ID number
    const newIdNumber = warehouseCount + 1;
    // Generate department ID in the format 'DEPT-xxxx'
    const warehouseId = `WARE-${String(newIdNumber).padStart(4, "0")}`;

    const data = await db.warehouse.create({
      data: {
        id: warehouseId,
        name,
        description: description || "",
        address,
      },
    });

    return { success: "Warehouse created successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to create warehouse. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateWarehouse = async (
  values: z.infer<typeof WarehouseValidators>,
  warehouseId: string
) => {
  if (!warehouseId) {
    return { error: "Warehouse ID is required." };
  }

  const validatedField = WarehouseValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, description, address } = validatedField.data;

  try {
    const data = await db.warehouse.update({
      where: {
        id: warehouseId,
      },
      data: {
        name,
        description: description || "",
        address,
      },
    });

    return { success: "Warehouse updated successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to update warehouse. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteWarehouse = async (warehouseId: string) => {
  if (!warehouseId) {
    return { error: "Warehouse ID is required." };
  }

  try {
    const data = await db.warehouse.delete({
      where: {
        id: warehouseId,
      },
    });

    return { success: "Warehouse deleted successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to delete warehouse. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
