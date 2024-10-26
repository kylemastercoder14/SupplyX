"use client";

import * as React from "react";
import {
  Armchair,
  BookCheck,
  Calculator,
  Cpu,
  LayoutList,
  PaintBucket,
  PhilippinePeso,
  PlusCircle,
  SendHorizontal,
  Settings,
  Truck,
  Wallet,
  Warehouse,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

const data = {
  user: {
    name: "Administrator",
    email: "administrator@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Setup",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Add Department",
          url: "/add-department",
        },
        {
          title: "Add Staff",
          url: "/add-staff",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Supplier",
      url: "#",
      icon: Warehouse,
      items: [
        {
          name: "Add Warehouse",
          url: "/supplier/add-warehouse",
          icon: PlusCircle,
        },
        {
          name: "Add Raw Materials",
          url: "/supplier/add-raw-materials",
          icon: PaintBucket,
        },
        {
          name: "Send Delivery Request",
          url: "/supplier/send-delivery-request",
          icon: SendHorizontal,
        },
      ],
    },
    {
      name: "Delivery",
      url: "#",
      icon: Truck,
      items: [
        {
          name: "Receive Raw Materials",
          url: "/delivery/receive-raw-materials",
          icon: Armchair,
        },
        {
          name: "Inventory",
          url: "/delivery/inventory",
          icon: Calculator,
        },
      ],
    },
    {
      name: "Procurement",
      url: "#",
      icon: LayoutList,
      items: [
        {
          name: "Receive Raw Materials",
          url: "/procurement/receive-raw-materials",
          icon: Armchair,
        },
        {
          name: "Send Raw Materials",
          url: "/procurement/send-raw-materials",
          icon: SendHorizontal,
        },
        {
          name: "Inventory",
          url: "/procurement/inventory",
          icon: Calculator,
        },
      ],
    },
    {
      name: "Production",
      url: "#",
      icon: Cpu,
      items: [
        {
          name: "Process Raw Materials",
          url: "/production/process-raw-materials",
          icon: Armchair,
        },
        {
          name: "Inventory",
          url: "/production/inventory",
          icon: Calculator,
        },
      ],
    },
    {
      name: "Sales",
      url: "#",
      icon: Wallet,
      items: [
        {
          name: "View Finished Goods",
          url: "/sales/view-finished-goods",
          icon: BookCheck,
        },
        {
          name: "Manage Orders",
          url: "/sales/manage-orders",
          icon: PhilippinePeso,
        },
        {
          name: "Inventory",
          url: "/sales/inventory",
          icon: Calculator,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
