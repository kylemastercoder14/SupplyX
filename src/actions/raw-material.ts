/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { RawMaterialValidators } from "@/lib/validators";
import { z } from "zod";

export const getAllRawMaterials = async () => {
  try {
    const data = await db.rawMaterial.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        warehouse: true,
      },
    });

    if (!data) {
      return { error: "No raw material found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createRawMaterial = async (
  values: z.infer<typeof RawMaterialValidators>
) => {
  const validatedField = RawMaterialValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, imageUrl, stock, buffer, unit, warehouseId } =
    validatedField.data;

  try {
    // Fetch the current count of departments
    const rawMaterialCount = await db.rawMaterial.count();
    // Increment count to get the next ID number
    const newIdNumber = rawMaterialCount + 1;
    // Generate department ID in the format 'DEPT-xxxx'
    const rawMaterialId = `RAW-MAT-${String(newIdNumber).padStart(4, "0")}`;

    const data = await db.rawMaterial.create({
      data: {
        id: rawMaterialId,
        name,
        unit,
        stock,
        buffer: buffer || 0,
        imageUrl,
        used: 0,
        warehouseId,
      },
    });

    return { success: "Raw material created successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to create raw material. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateRawMaterial = async (
  values: z.infer<typeof RawMaterialValidators>,
  rawMaterialId: string
) => {
  if (!rawMaterialId) {
    return { error: "Raw material ID is required." };
  }

  const validatedField = RawMaterialValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, imageUrl, stock, buffer, unit, warehouseId } =
    validatedField.data;

  try {
    const data = await db.rawMaterial.update({
      where: {
        id: rawMaterialId,
      },
      data: {
        name,
        imageUrl,
        stock,
        buffer,
        unit,
        warehouseId,
      },
    });

    return { success: "Raw material updated successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to update raw material. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteRawMaterial = async (rawMaterialId: string) => {
  if (!rawMaterialId) {
    return { error: "Raw material ID is required." };
  }

  try {
    const data = await db.rawMaterial.delete({
      where: {
        id: rawMaterialId,
      },
    });

    return { success: "Raw material deleted successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to delete raw material. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
