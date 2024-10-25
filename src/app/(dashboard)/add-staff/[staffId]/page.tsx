import React from "react";
import db from "@/lib/db";
import StaffForm from "@/components/forms/staff-form";

const StaffPage = async ({ params }: { params: { staffId: string } }) => {
  const staff = await db.user.findUnique({
    where: {
      id: params.staffId,
    },
  });

  const department = await db.department.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const position = await db.position.findMany({
    orderBy: {
      name: "asc"
    }
  })

  return (
    <div className="px-5 flex-1 space-y-4">
      <StaffForm initialData={staff} department={department} position={position} />
    </div>
  );
};

export default StaffPage;