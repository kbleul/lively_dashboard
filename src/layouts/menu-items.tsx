import { routes } from "@/config/routes";
import { PiFileImageDuotone, PiTimerDuotone } from "react-icons/pi";
import { PiNotepadDuotone } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { LuStore } from "react-icons/lu";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiToolboxThin } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdOutlineContentPasteGo } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { TbServicemark } from "react-icons/tb";
// Note: do not add href in the label object, it is rendering as label

export const operationalManagetMenuItems = [
  // label start
  {
    name: "Operational Manager Menu",
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
    icon: <PiToolboxThin />,
    dropdownItems: [
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
    name: "Payments",
    href: routes.operationalManager.appointments,
    // href: routes.file.dashboard,
    icon: <MdOutlineAttachMoney />,
  },
  {
    name: "Contacts",
    href: routes.operationalManager.contact,
    // href: routes.file.dashboard,
    icon: <RiContactsBook2Line />,
  },
  // {
  //   name: "Centers",
  //   href: routes.operationalManager.centers.list,
  //   // href: routes.file.dashboard,
  //   icon: <PiChalkboardTeacherBold />,
  // },
  {
    name: "Experts",
    href: routes.operationalManager.experts.list,
    // href: routes.file.dashboard,
    icon: <GrUserExpert />,
  },
  {
    name: "Centers",
    href: routes.operationalManager.centers.list,
    // href: routes.file.dashboard,
    icon: <LuStore />,
  },

  {
    name: "Places",
    href: "#",
    icon: <MdOutlineLocalGroceryStore />,
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
    name: "Expert Menu",
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
    name: "Content Creation Menu",
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
    icon: <MdOutlineContentPasteGo />,
    dropdownItems: [
      {
        name: "Languages",
        href: routes.contentCreator.language,
      },
      {
        name: "payment Methods",
        href: routes.contentCreator.paymentMethod,
      },
      {
        name: "Cities",
        href: routes.contentCreator.city,
      },
      {
        name: "speciality",
        href: routes.contentCreator.speciality,
      },
      {
        name: "occupation",
        href: routes.contentCreator.occupation,
      },
      // {
      //   name: "register experts",
      //   href: routes.contentCreator.experts.create,
      // },
    ],
  },
  {
    name: "Products",
    href: "#",
    icon: <LiaProductHunt />,
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
    icon: <TbServicemark />,
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
    name: "Mranch Manager Menu",
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
