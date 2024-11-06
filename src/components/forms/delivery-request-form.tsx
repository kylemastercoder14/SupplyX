/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { DeliveryRequestValidators } from "@/lib/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveRawMaterial } from "@/data/raw-material";
import { RawMaterial } from "@prisma/client";

const DeliveryRequestForm = ({
  initialData,
  onClose,
  rawMaterials,
}: {
  initialData: any;
  onClose: () => void;
  rawMaterials: RawMaterial[];
}) => {
  const title = initialData ? "Edit Delivery Request" : "Add Delivery Request";
  const description = initialData
    ? "Make sure to click save changes after you update the delivery request."
    : "Please fill the required fields to add a new delivery request.";
  const action = initialData ? "Save Changes" : "Send Delivery Request";
  const [selectedMaterial, setSelectedMaterial] =
    React.useState<RawMaterial | null>(null);
  const form = useForm<z.infer<ReturnType<typeof DeliveryRequestValidators>>>({
    resolver: zodResolver(
      DeliveryRequestValidators(selectedMaterial?.stock || Infinity)
    ),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          rawMaterialId: "",
          quantity: 0,
        },
  });

  const { mutate: saveRawMaterial, isPending: isSaving } =
    useSaveRawMaterial(initialData);

  async function onSubmit(values: z.infer<ReturnType<typeof DeliveryRequestValidators>>) {
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
                  fieldType={FormFieldType.SELECT}
                  placeholder="Select raw material"
                  dynamicOptions={rawMaterials.map((raw) => ({
                    label: raw.name,
                    value: raw.id,
                  }))}
                  label="Raw Material"
                  isRequired={true}
                  name="rawMaterialId"
                  disabled={isSaving}
                  onChange={(e) => {
                    const selected = rawMaterials.find(
                      (raw) => raw.id === e.target.value
                    );
                    setSelectedMaterial(selected || null);
                  }}
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  placeholder="Enter quantity"
                  label="Quantity"
                  type="number"
                  isRequired={true}
                  name="quantity"
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

export default DeliveryRequestForm;
