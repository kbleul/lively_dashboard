import { routes } from "@/config/routes";
import {
  PiChalkboardTeacherBold,
  PiFileImageDuotone,
  PiTimerDuotone,
} from "react-icons/pi";
import { PiNotepadDuotone } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserNurse, FaWpforms } from "react-icons/fa6";
// Note: do not add href in the label object, it is rendering as label

export const operationalManagetMenuItems = [
  // label start
  {
    name: "Home",
    label: "Operational Manager",
  },
  // label end
  {
    name: "Dashboard",
    href: routes.operationalManager.dashboard,
    // href: routes.file.dashboard,
    icon: <MdOutlineDashboard />,
  },

  // label start
  {
    name: "Tools",
  },
  // label end
  {
    name: "Lively Tools",
    href: "#",
    icon: <FaWpforms />,
    dropdownItems: [
      {
        name: "City",
        href: routes.operationalManager.city,
      },

      {
        name: "speciality",
        href: routes.operationalManager.speciality,
      },

      {
        name: "occupation",
        href: routes.operationalManager.occupation,
      },
      {
        name: "register experts",
        href: routes.operationalManager.experts.create,
      },
      {
        name: "create Wellbeign Center",
        href: routes.operationalManager.centers.create,
      },
    ],
  },
  {
    name: "Appoitments",
    href: routes.operationalManager.appointments,
    // href: routes.file.dashboard,
    icon: <PiNotepadDuotone />,
  },
  {
    name: "Contacts",
    href: routes.operationalManager.contact,
    // href: routes.file.dashboard,
    icon: <PiNotepadDuotone />,
  },
  {
    name: "Centers",
    href: routes.operationalManager.centers.list,
    // href: routes.file.dashboard,
    icon: <PiChalkboardTeacherBold />,
  },
  {
    name: "Experts",
    href: routes.operationalManager.experts.list,
    // href: routes.file.dashboard,
    icon: <FaUserNurse />,
  },

  {
    name: "Places",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "Places",
        href: routes.operationalManager.places.list,
      },
      {
        name: "Create Place",
        href: routes.operationalManager.places.create,
      },
    ],
  },
];

export const expertMenuItems = [
  {
    name: "Home",
    label: null,
  },
  // label end
  {
    name: "Dashboard",
    href: "/",
    // href: routes.file.dashboard,
    icon: <PiFileImageDuotone />,
  },

  {
    name: "Availability",
    href: routes.expert.availability,
    // href: routes.file.dashboard,
    icon: <PiTimerDuotone />,
  },
  {
    name: "Appoitments",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "Appoitments",
        href: routes.expert.appointments,
      },
    ],
  },
];

export const contentCretorMenuItems = [
  {
    name: "Home",
    label: "Content Creation",
  },
  // label end
  {
    name: "Dashboard",
    href: "/",
    // href: routes.file.dashboard,
    icon: <PiFileImageDuotone />,
  },

  {
    name: "Contents",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "Languages",
        href: routes.contentCreator.language,
      },
      {
        name: "payment Methods",
        href: routes.contentCreator.paymentMethod,
      },
    ],
  },
  {
    name: "Products",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "Tags",
        href: routes.contentCreator.tags,
      },
      {
        name: "Units",
        href: routes.contentCreator.unit,
      },
      {
        name: "Brands",
        href: routes.contentCreator.brand,
      },
      {
        name: "Products",
        href: routes.contentCreator.product,
      },
    ],
  },
  {
    name: "Services",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "Services",
        href: routes.contentCreator.services.list,
      },
      {
        name: "Amenity",
        href: routes.contentCreator.services.amenity,
      },
    ],
  },
];

export const branchManagerMenuItems = [
  {
    name: "Home",
  },
  // label end
  {
    name: "Dashboard",
    href: "/",
    // href: routes.file.dashboard,
    icon: <PiFileImageDuotone />,
  },

  {
    name: "Packages",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "Packages",
        href: routes.branchManger.packages,
      },
    ],
  },
  {
    name: "Products",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "Products",
        href: routes.branchManger.products,
      },
    ],
  },
];
