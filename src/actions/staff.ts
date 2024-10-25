/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/lib/db";
import { StaffValidators } from "@/lib/validators";
import { z } from "zod";

export const getAllStaff = async () => {
  try {
    const data = await db.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        department: true,
      },
    });

    if (!data) {
      return { error: "No user found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createStaff = async (values: z.infer<typeof StaffValidators>) => {
  const validatedField = StaffValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    firstName,
    middleName,
    lastName,
    birthdate,
    barangay,
    contactNumber,
    departmentId,
    email,
    houseNumber,
    municipality,
    password,
    positionId,
    province,
    region,
    sex,
  } = validatedField.data;

  try {
    // Fetch the current count of departments
    const staffCount = await db.user.count();
    // Increment count to get the next ID number
    const newIdNumber = staffCount + 1;
    // Generate department ID in the format 'DEPT-xxxx'
    const staffId = `EMP-${String(newIdNumber).padStart(4, "0")}`;
    const address = `${houseNumber}, ${barangay}, ${municipality}, ${province}, ${region}`;

    const data = await db.user.create({
      data: {
        id: staffId,
        firstName,
        middleName: middleName || "",
        lastName,
        birthdate,
        sex,
        contactNumber,
        address,
        email,
        password,
        departmentId,
        position: positionId,
      },
    });

    return { success: "Staff created successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to create staff. Please try again. ${error.message || ""}`,
    };
  }
};

export const updateStaff = async (
  values: z.infer<typeof StaffValidators>,
  staffId: string
) => {
  if (!staffId) {
    return { error: "Staff ID is required." };
  }

  const validatedField = StaffValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    firstName,
    middleName,
    lastName,
    birthdate,
    barangay,
    contactNumber,
    departmentId,
    email,
    houseNumber,
    municipality,
    password,
    positionId,
    province,
    region,
    sex,
  } = validatedField.data;

  const address = `${houseNumber}, ${barangay}, ${municipality}, ${province}, ${region}`;

  try {
    const data = await db.user.update({
      where: {
        id: staffId,
      },
      data: {
        firstName,
        middleName: middleName || "",
        lastName,
        birthdate,
        sex,
        contactNumber,
        address,
        email,
        password,
        departmentId,
        position: positionId,
      },
    });

    return { success: "Staff updated successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to update staff. Please try again. ${error.message || ""}`,
    };
  }
};

export const deleteStaff = async (staffId: string) => {
  if (!staffId) {
    return { error: "Staff ID is required." };
  }

  try {
    const data = await db.user.delete({
      where: {
        id: staffId,
      },
    });

    return { success: "Staff deleted successfully", data };
  } catch (error: any) {
    return {
      error: `Failed to delete staff. Please try again. ${error.message || ""}`,
    };
  }
};
