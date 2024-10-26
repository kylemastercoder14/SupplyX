/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { RawMaterialValidators } from "@/lib/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveRawMaterial } from "@/data/raw-material";
import { Warehouse } from "@prisma/client";

const RawMaterialForm = ({
  initialData,
  onClose,
  wareHouse,
}: {
  initialData: any;
  onClose: () => void;
  wareHouse: Warehouse[];
}) => {
  const title = initialData ? "Edit Raw Material" : "Add Raw Material";
  const description = initialData
    ? "Make sure to click save changes after you update the raw material."
    : "Please fill the required fields to add a new raw material.";
  const action = initialData ? "Save Changes" : "Save Raw Material";
  const form = useForm<z.infer<typeof RawMaterialValidators>>({
    resolver: zodResolver(RawMaterialValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          stock: 0,
          buffer: 0,
          imageUrl: "",
          unit: "",
          warehouseId: "",
        },
  });

  const { mutate: saveRawMaterial, isPending: isSaving } =
    useSaveRawMaterial(initialData);

  async function onSubmit(values: z.infer<typeof RawMaterialValidators>) {
    saveRawMaterial(values, {
      onSuccess: () => onClose(),
    });
  }

  return (
    <>
      <Modal
        isOpen={true}
        onClose={onClose}
        title={title}
        description={description}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto grid flex-1 auto-rows-max gap-4">
              <div className="grid gap-4">
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="Raw Material Name"
                  label="Name"
                  isRequired={true}
                  name="name"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SELECT}
                  placeholder="Select unit"
                  options={["pcs", "kg", "bottle", "box"]}
                  label="Unit"
                  isRequired={true}
                  name="unit"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SELECT}
                  placeholder="Select warehouse"
                  dynamicOptions={wareHouse.map((wh) => ({
                    label: wh.name,
                    value: wh.id,
                  }))}
                  label="Warehouse"
                  isRequired={true}
                  name="warehouseId"
                  disabled={isSaving}
                />
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    placeholder="Enter stock"
                    label="Stock"
                    type="number"
                    isRequired={true}
                    name="stock"
                    disabled={isSaving}
                  />
                  <CustomFormField
                    control={form.control}
                    fieldType={FormFieldType.INPUT}
                    placeholder="Enter buffer"
                    label="Buffer"
                    type="number"
                    isRequired={false}
                    name="buffer"
                    disabled={isSaving}
                  />
                </div>
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.DROP_ZONE}
                  label="Image"
                  isRequired={true}
                  name="imageUrl"
                  disabled={isSaving}
                />
                <Button type="submit" disabled={isSaving} size="sm">
                  {isSaving && <Loader className="animate-spin w-4 h-4 mr-2" />}
                  {action}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default RawMaterialForm;
