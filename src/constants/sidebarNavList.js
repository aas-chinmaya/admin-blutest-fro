

"use client";

import {
  LayoutDashboard,
  PhoneCall,
  CalendarDays,
  User,
  Folder,
  Users,
  ListChecks,
  Bug,
  FolderClosed,
  FileText,
  Inbox,
} from "lucide-react";

// Icon map
export const iconMap = {
  LayoutDashboard,
  PhoneCall,
  CalendarDays,
  User,
  Folder,
  Users,
  ListChecks,
  Bug,
  FolderClosed,
  FileText,
  Inbox,
};

// Role groups
export const roleGroups = {
  cpcGroup: ["cpc", "Team Lead"],       // Team Lead mirrors cpc
  employeeGroup: ["employee(regular)"], // regular employee
};

// Full navigation
export const fullNav = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "LayoutDashboard",
    roles: ["cpcGroup", "employeeGroup"],
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: "Inbox",
    roles: ["cpcGroup", "employeeGroup"],
  },
   {
    title: "Calendar",
    url: "/calendar",
    icon: "Inbox",
    roles: ["cpcGroup", "employeeGroup"],
  },
  
  
  {
    title: "My WorkSpace",
    url: "#",
    icon: "CalendarDays",
    roles: ["employeeGroup"],
    items: [
      { title: "My Project", url: "/myworkspace/projects", roles: ["employeeGroup"] },
      { title: "My Team", url: "/myworkspace/teams", roles: ["employeeGroup"] },
      { title: "My Task", url: "/myworkspace/tasks", roles: ["employeeGroup"] },
      { title: "My Issues", url: "/myworkspace/issues", roles: ["employeeGroup"] },
    ],
  },
  {
    title: "Work Space",
   url: "#",
   icon: "CalendarDays",
   roles: ["cpcGroup"],
   items: [
     { title: "All Project", url: "/workspace/projects", roles: ["cpcGroup"] },
     { title: "All Team", url: "/workspace/teams", roles: ["cpcGroup"] },
     { title: "All Task", url: "/workspace/tasks", roles: ["cpcGroup"] },
     { title: "All Issues", url: "/workspace/issues", roles: ["cpcGroup"] },
    ],
  },
  {
   title: "Marketing",
   url: "#",
   icon: "Inbox",
   roles: ["cpcGroup"],
   items: [
     { title: "Overview", url: "/marketing", roles: ["cpcGroup", "employeeGroup"] },
     { title: "Received Contacts", url: "/marketing/contacts", roles: ["cpcGroup", "employeeGroup"] },
   ],
 },
  {
   title: "Sales",
   url: "#",
   icon: "Inbox",
   roles: ["cpcGroup"],
   items: [
     { title: "Quotation Requests", url: "/sales/quotation-requests", roles: ["cpcGroup", "employeeGroup"] },
     { title: "Approved Quotations", url: "/sales/approved", roles: ["cpcGroup", "employeeGroup"] },
   ],
 },
  //  {
  //   title: "Contact",
  //   url: "/contact",
  //   icon: "PhoneCall",
  //   roles: ["cpcGroup"],
  // },
  //  {
  //   title: "Client",
  //   url: "/client",
  //   icon: "User",
  //   roles: ["cpcGroup"],
  // },
 

  // {
  //   title: "Quotation",
  //   url: "/quotation",
  //   icon: "FileText",
  //   roles: ["cpcGroup"],
  // },
  // {
  //   title: "Meeting",
  //   url: "#",
  //   icon: "CalendarDays",
  //   roles: ["cpcGroup"],
  //   items: [
  //     { title: "Client Meeting", url: "/meetings/all", roles: ["cpcGroup"] },
  //     { title: "Meeting Calendar", url: "/meetings/calendar", roles: ["cpcGroup"] },
  //     // { title: "MOM Dashboard", url: "/meetings/mom", roles: ["cpcGroup"] },
      
  //   ],
  // },
  

  {
    title: "Concerns",
    url: "#",
    icon: "FolderClosed",
    roles: ["cpcGroup"],
    items: [
      { title: "Cause Dashboard", url: "/meetings/cause", roles: ["cpcGroup"] },
    ],
  },
  {
    title: "Master",
    url: "#",
    icon: "FolderClosed",
    roles: ["cpcGroup"],
    items: [
      { title: "Service", url: "/master/services", roles: ["cpcGroup"] },
      { title: "Industry", url: "/master/industry", roles: ["cpcGroup"] },
      { title: "Meeting Slots", url: "/master/slots", roles: ["cpcGroup"] },
    ],
  },
];









