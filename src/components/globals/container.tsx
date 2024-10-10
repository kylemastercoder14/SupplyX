import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "lg:px-60 md:px-40 px-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
