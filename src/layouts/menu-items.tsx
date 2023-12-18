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
        href: routes.operationalManager.registerExpert,
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

  // {
  //   name: "Appoitments",
  //   href: "#",
  //   icon: <PiNotepadDuotone />,
  //   dropdownItems: [
  //     {
  //       name: "Appoitments",
  //       href: routes.operationalManager.appointments,
  //     },
  //   ],
  // },
];

export const expertMenuItems = [
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
        href: routes.appointments,
      },
    ],
  },
];
