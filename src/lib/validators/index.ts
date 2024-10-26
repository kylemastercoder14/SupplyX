import { z } from "zod";

export const DepartmentValidators = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
});

export const StaffValidators = z.object({
  firstName: z.string().min(1, "First name is required."),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required."),
  birthdate: z.string().min(1, "Birthdate is required."),
  sex: z.string().min(1, "Sex is required."),
  contactNumber: z.string().min(1, "Contact number is required."),
  houseNumber: z.string().min(1, "House number is required."),
  barangay: z.string().min(1, "Barangay is required."),
  municipality: z.string().min(1, "Municipality is required."),
  province: z.string().min(1, "Province is required."),
  region: z.string().min(1, "Region is required."),
  email: z.string().email("Invalid email format.").min(1, "Email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  departmentId: z.string().min(1, "Department is required."),
  positionId: z.string().min(1, "Position is required."),
});

export const WarehouseValidators = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  description: z.string().optional(),
});

export const RawMaterialValidators = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  warehouseId: z.string().min(1, { message: "Warehouse is required" }),
  stock: z.coerce.number().min(1, { message: "Stock is required" }),
  buffer: z.coerce.number().optional(),
});

