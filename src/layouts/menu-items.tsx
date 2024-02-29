import { routes } from "@/config/routes";
import { PiFileImageDuotone, PiTimerDuotone } from "react-icons/pi";
import { PiNotepadDuotone } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiToolboxThin } from "react-icons/pi";
import { MdOutlineAttachMoney, MdOutlinePayment } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdOutlineContentPasteGo } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { TbServicemark } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { CgProductHunt } from "react-icons/cg";
import { MdOutlineReportProblem } from "react-icons/md";
// Note: do not add href in the label object, it is rendering as label

export const operationalManagetMenuItems = [
  {
    name: "Operational Manager Menu",
    label: "Operational Manager",
  },
  // label end
  {
    name: "Dashboard",
    href: routes.operationalManager.dashboard,
    icon: <MdOutlineDashboard />,
  },

  {
    name: "Tools",
  },
  {
    name: "Lively Tools",
    href: "#",
    icon: <PiToolboxThin />,
    dropdownItems: [
      {
        name: "Banners",
        href: routes.operationalManager.banners,
      },
      {
        name: "Subscriptions",
        href: routes.operationalManager.subscriptions,
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
    name: "Bookings",
    href: routes.operationalManager.appointments,
    icon: <MdOutlineAttachMoney />,
  },
  {
    name: "Contacts",
    href: routes.operationalManager.contact,
    icon: <RiContactsBook2Line />,
  },

  {
    name: "Experts",
    href: routes.operationalManager.experts.list,
    icon: <GrUserExpert />,
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
        name: "List",
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
    name: "Branch Manager Menu",
  },
  // label end
  {
    name: "Dashboard",
    href: "/",
    // href: routes.file.dashboard,
    icon: <PiFileImageDuotone />,
  },
  {
    name: "Members",
    href: "#",
    icon: <CiUser />,
    dropdownItems: [
      {
        name: "List",
        href: routes.branchManger["list-members"],
      },
    ],
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
    icon: <CgProductHunt />,
    dropdownItems: [
      {
        name: "Products",
        href: routes.branchManger.products,
      },
      {
        name: "Discount",
        href: routes.branchManger.productsDiscount,
      },
      {
        name: "Claimed Discount",
        href: routes.branchManger.claimedDiscount,
      },
    ],
  },
  {
    name: "Reviews",
    href: "#",
    icon: <PiNotepadDuotone />,
    dropdownItems: [
      {
        name: "List",
        href: routes.branchManger.reviews,
      },
    ],
  },
];

export const adminMenuItems = [
  {
    name: "Admin Menu",
  },
  {
    name: "Dashboard",
    href: "/",
    icon: <PiFileImageDuotone />,
  },
  {
    name: "Plan",
    href: "#",
    icon: <MdOutlinePayment />,
    dropdownItems: [
      {
        name: "List",
        href: routes.admin.plans,
      },
    ],
  },
  {
    name: "Report Reasons",
    href: "#",
    icon: <MdOutlineReportProblem />,
    dropdownItems: [
      {
        name: "List",
        href: routes.admin.reason,
      },
    ],
  },
];
