/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { WarehouseValidators } from "@/lib/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveWarehouse } from "@/data/warehouse";

const WarehouseForm = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  const title = initialData ? "Edit Warehouse" : "Add Warehouse";
  const description = initialData
    ? "Make sure to click save changes after you update the warehouse."
    : "Please fill the required fields to add a new warehouse.";
  const action = initialData ? "Save Changes" : "Save Warehouse";
  const form = useForm<z.infer<typeof WarehouseValidators>>({
    resolver: zodResolver(WarehouseValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          description: "",
          address: "",
        },
  });

  const { mutate: saveWarehouse, isPending: isSaving } =
    useSaveWarehouse(initialData);

  async function onSubmit(values: z.infer<typeof WarehouseValidators>) {
    saveWarehouse(values, {
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
                  placeholder="Warehouse Name"
                  label="Name"
                  isRequired={true}
                  name="name"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  placeholder="Enter description here..."
                  label="Description"
                  isRequired={false}
                  name="description"
                  disabled={isSaving}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="Warehouse Address"
                  label="Address"
                  isRequired={true}
                  name="address"
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

export default WarehouseForm;
