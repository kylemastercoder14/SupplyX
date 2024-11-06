/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { DeliveryRequestValidators, RawMaterialValidators } from "@/lib/validators";
import { z } from "zod";

export const getAllDeliveryRequest = async () => {
  try {
    const data = await db.delivery.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
       rawMaterial: true,
       procurement: true,
      },
    });

    if (!data) {
      return { error: "No delivery request found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createDeliveryRequest = async (
  values: z.infer<ReturnType<typeof DeliveryRequestValidators>>
) => {
  const validatedField = DeliveryRequestValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { rawMaterialId, quantity } =
    validatedField.data;

  try {
    // Fetch the current count of departments
    const deliveryRequest = await db.delivery.count();
    // Increment count to get the next ID number
    const newIdNumber = deliveryRequest + 1;
    const deliveryRequestId = `DEL-REQ-${String(newIdNumber).padStart(4, "0")}`;

    const data = await db.delivery.create({
      data: {
        id: deliveryRequestId,
        rawMaterialId,
        quantity,
        status: "Pending",
        dateSent: new Date(),
      },
    });

    return { success: "Delivery request created successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to create delivery request. Please try again. ${
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
