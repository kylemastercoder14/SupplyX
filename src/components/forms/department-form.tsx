/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { DepartmentValidators } from "@/lib/validators";
import CustomFormField from "../globals/custom-formfield";
import { FormFieldType } from "@/constants";
import { Modal } from "../ui/modal";
import { useSaveDepartment } from "@/data/department";

const DepartmentForm = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  const title = initialData ? "Edit Department" : "Add Department";
  const description = initialData
    ? "Make sure to click save changes after you update the department."
    : "Please fill the required fields to add a new department.";
  const action = initialData ? "Save Changes" : "Save Department";
  const form = useForm<z.infer<typeof DepartmentValidators>>({
    resolver: zodResolver(DepartmentValidators),
    mode: "onChange",
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
        },
  });

  const { mutate: saveDepartment, isPending: isSaving } =
    useSaveDepartment(initialData);

  async function onSubmit(values: z.infer<typeof DepartmentValidators>) {
    saveDepartment(values, {
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
                  placeholder="Supplier"
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

export default DepartmentForm;
