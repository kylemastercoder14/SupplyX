export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  OTP_INPUT = "otpInput",
  SELECT = "select",
  DYNAMICSELECT = "dynamicSelect",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  SWITCH = "switch",
  SLIDER = "slider",
  DATE_PICKER = "datePicker",
  DROP_ZONE = "dropZone",
  SKELETON = "skeleton",
  HIDDEN = "hidden",
  HONEY_POT = "honeyPot",
}

export const OPT_LENGTH = 6;

export const DATE_YEAR_MIN = 1970;
export const DATE_DEFAULT_FORMAT = "yyyy-MM-dd"; // 2022-08-11
export const DATETIME_DEFAULT_FORMAT = "yyyy-MM-dd h:mm a"; // 2022-08-11 1:00 PM
export const DATE_DISPLAY_FORMAT = "PPP";

export const MAX_UPLOAD_FILE_SIZE = 5242880; // 5MB
export const DEFAULT_MAX_FILES = 5;
export const DEFAULT_MIN_FILE = 1;

export enum UploaderType {
  MULTIPLE_ANY = "multiple_any",
  SINGLE_ANY = "single_any",
  SINGLE_DOCUMENT = "single_document",
  MULTIPLE_DOCUMENT = "multiple_documents",
  SINGLE_IMAGE = "single_image",
  MULTIPLE_IMAGE = "multiple_images",
}

export const AcceptedFileTypes = {
  document: {
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
    "application/vnd.ms-excel": [".xls", ".xlsx"],
    "text/csv": [".csv"],
  },
  image: { "image/*": [".jpg", ".jpeg", ".png", ".heic", ".heif"] },
  default: {
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
    "application/vnd.ms-excel": [".xls", ".xlsx"],
    "text/csv": [".csv"],
    "text/plain": [".txt"],
    "image/*": [".jpg", ".jpeg", ".png", ".heic", ".heif"],
  },
};

export * from "./barangay";
export * from "./region";
export * from "./municipality";
export * from "./province";


export const GROUP_ICONS = [
  {
    id: 1,
    name: "Supplier",
    designation: "Group 1",
    image:
      "https://scontent.fmnl4-7.fna.fbcdn.net/v/t1.6435-9/73174652_2425925704337078_2194659624613838848_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeECpFdpG9BYOA88p4xVkK7nFFI3Sum78XsUUjdK6bvxe_K_D07Axd6hUOPgQW3mAE_PhVIH0edMkLdKjoOyHWNu&_nc_ohc=Au-rfRGKj_EQ7kNvgH1uOti&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=ApauRJbkzbjILP6k2sRHqpY&oh=00_AYDCJEqX8tyvyI_RlVnyY4zzZk2g6IjKo50GD5oZaRBhQQ&oe=672F0262",
  },
  {
    id: 2,
    name: "Delivery",
    designation: "Group 2",
    image:
      "https://scontent.fmnl4-6.fna.fbcdn.net/v/t39.30808-6/455132654_1951427431974312_5996769713566332461_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHsmscQAlXDjJmyMB9qYQU4wtX34r0RCZ3C1ffivREJnXMhE_vJfJUuNOeyxMyr-i1guUZ3LED-yBcZ57ofChw1&_nc_ohc=IwuRM35yN18Q7kNvgGHt4Oh&_nc_ht=scontent.fmnl4-6.fna&_nc_gid=AwV2n8zAx5lNdNBCGDNTTqy&oh=00_AYA0vs12WZDsDt1o62aXjPnRXlok5IW8KyZyIvT8v0NnRA&oe=670D55EC",
  },
  {
    id: 3,
    name: "Procurement",
    designation: "Group 3",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Production",
    designation: "Group 4",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Sales System",
    designation: "Group 5",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
];
