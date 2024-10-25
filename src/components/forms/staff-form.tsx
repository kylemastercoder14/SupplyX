"use client";

import { useAddressData } from "@/lib/address-selection";
import { StaffValidators } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Department, Position, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import Heading from "../ui/heading";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { parseAddress } from "@/lib/utils";
import { useSaveStaff } from "@/data/staff";

const StaffForm = ({
  initialData,
  department,
  position,
}: {
  initialData: User | null;
  department: Department[];
  position: Position[];
}) => {
  const router = useRouter();
  const title = initialData
    ? "Edit Staff Information"
    : "Add Staff Information";
  const description = initialData
    ? "Make sure to click save changes after you update the staff."
    : "Please fill the required fields to add a new staff.";
  const action = initialData ? "Save Changes" : "Save Staff";
  const addressComponents = parseAddress(initialData?.address ?? "");
  const form = useForm<z.infer<typeof StaffValidators>>({
    resolver: zodResolver(StaffValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
          middleName: initialData?.middleName ?? "",
          municipality: addressComponents.municipality ?? "",
          region: addressComponents.region ?? "",
          province: addressComponents.province ?? "",
          barangay: addressComponents?.barangay ?? "",
          departmentId: initialData?.departmentId ?? "",
          positionId: initialData?.positionId ?? "",
        }
      : {
          firstName: "",
          middleName: "",
          lastName: "",
          birthdate: "",
          sex: "",
          contactNumber: "",
          houseNumber: "",
          barangay: "",
          municipality: "",
          province: "",
          region: "",
          email: "",
          password: "",
          departmentId: "",
          positionId: "",
        },
  });

  const { mutate: saveStaff, isPending: isLoading } =
    useSaveStaff(initialData);

  async function onSubmit(values: z.infer<typeof StaffValidators>) {
    saveStaff(values, {
      onSuccess: () => router.push("/add-staff"),
    });
  }

  const selectedRegionName = form.watch("region");
  const selectedProvinceName = form.watch("province");
  const selectedMunicipalityName = form.watch("municipality");

  const {
    regionOptions,
    provinceOptions,
    municipalityOptions,
    barangayOptions,
  } = useAddressData(
    selectedRegionName,
    selectedProvinceName,
    selectedMunicipalityName
  );
  return (
    <Form {...form}>
      <Heading title={title} description={description} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
            <CustomFormField
              label="First Name"
              name="firstName"
              placeholder="Juan"
              isRequired
              type="text"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Middle Name"
              name="middleName"
              placeholder="Santiago"
              isRequired={false}
              type="text"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Last Name"
              name="lastName"
              placeholder="Dela Cruz"
              isRequired
              type="text"
              fieldType={FormFieldType.INPUT}
              control={form.control}
              disabled={isLoading}
            />
          </div>
          <CustomFormField
            label="Email Address"
            name="email"
            placeholder="jdelacruz@kld.edu.ph"
            isRequired
            type="email"
            fieldType={FormFieldType.INPUT}
            control={form.control}
            disabled={isLoading}
          />
          <CustomFormField
            label="Phone Number"
            name="phoneNumber"
            type="phone"
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            disabled={isLoading}
            isRequired
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              label="Date of Birth"
              name="birthDate"
              placeholder="dd/mm/yyyy"
              isRequired
              type="date"
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              disabled={isLoading}
            />
            <CustomFormField
              label="Sex"
              name="gender"
              placeholder="Select your sex"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              options={["Male", "Female"]}
              disabled={isLoading}
            />
          </div>
          <CustomFormField
            label="House/Unit/Block No., Street, Subdivision/Village"
            name="houseNumber"
            placeholder="Blk 1 Lot 2 Phase 3"
            isRequired
            fieldType={FormFieldType.INPUT}
            type="text"
            control={form.control}
            disabled={isLoading}
          />
          <CustomFormField
            label="Region"
            name="region"
            placeholder="Select your region"
            isRequired
            fieldType={FormFieldType.SELECT}
            control={form.control}
            dynamicOptions={regionOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            disabled
          />
          <CustomFormField
            label="Province"
            name="province"
            placeholder="Select your province"
            isRequired
            fieldType={FormFieldType.SELECT}
            control={form.control}
            dynamicOptions={provinceOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            disabled
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              label="Municipality"
              name="municipality"
              placeholder="Select your municipality"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={municipalityOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              disabled={isLoading}
            />
            <CustomFormField
              label="Barangay"
              name="barangay"
              placeholder="Select your barangay"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={barangayOptions.map((option) => ({
                label: option,
                value: option,
              }))}
              disabled={isLoading || !selectedMunicipalityName}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomFormField
              label="Department"
              name="departmentId"
              placeholder="Select your department"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={department.map((option) => ({
                label: option.name,
                value: option.id,
              }))}
              disabled={isLoading}
            />
            <CustomFormField
              label="Position"
              name="positionId"
              placeholder="Select your position"
              isRequired
              fieldType={FormFieldType.SELECT}
              control={form.control}
              dynamicOptions={position.map((option) => ({
                label: option.name,
                value: option.id,
              }))}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
              {action}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default StaffForm;
