import { routes } from "@/config/routes";
import { PiFileImageDuotone, PiTimerDuotone } from "react-icons/pi";
import { PiNotepadDuotone } from "react-icons/pi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { PiToolboxThin } from "react-icons/pi";
import { MdOutlineAttachMoney, MdOutlinePayment } from "react-icons/md";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdOutlineContentPasteGo } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { TbServicemark } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { CgProductHunt } from "react-icons/cg";
import { MdOutlineReportProblem } from "react-icons/md";
import { FaQuestion, FaUserTie } from "react-icons/fa6";
import { FaUserMd } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { BsJournalPlus } from "react-icons/bs";
import { IoFlagOutline } from "react-icons/io5";
// Note: do not add href in the label object, it is rendering as label

export const counselorMenuItems = [
  {
    name: "Counselor Menu",
    label: null,
  },
  {
    name: "Dashboard",
    href: routes.counselor.dashboard,
    icon: <PiFileImageDuotone />,
  },
  {
    name: "Experts",
    href: "#",
    icon: <FaUserMd />,
    dropdownItems: [
      {
        name: "List",
        href: routes.counselor.experts.list,
      },
    ],
  },
  {
    name: "Clients",
    href: "#",
    icon: <CiUser />,
    dropdownItems: [
      {
        name: "List",
        href: routes.counselor.clients,
      },
    ],
  },
  {
    name: "Appointments",
    href: routes.counselor.appointments,
    icon: <LuCalendarDays />,
  },
  {
    name: "Intake Answers",
    href: routes.counselor.intake,
    icon: <HiOutlineDocumentText />,
  },
  {
    name: "Questioner",
    href: "#",
    icon: <FaQuestion />,
    dropdownItems: [
      {
        name: "Self Assessment",
        href: routes.counselor.assessments,
      },
      {
        name: "Quick Self Assessment",
        href: routes.counselor["quick-self-assessment"],
      },
    ],
  },
  {
    name: "Journal",
    href: routes.counselor["journal-prompts"],
    icon: <BsJournalPlus />,
  },
  {
    name: "Reports",
    href: routes.counselor.reports,
    icon: <IoFlagOutline />,
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
    icon: <PiFileImageDuotone />,
  },
  {
    name: "Clients",
    href: "#",
    icon: <CiUser />,
    dropdownItems: [
      {
        name: "List",
        href: routes.expert.clients,
      },
    ],
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

export const operationalManagetAsBMMenuItems = (pathname: string) => {
  return [
    {
      name: "Branch Manager Menu",
      label: "Branch Manager",
    },
    {
      name: "Dashboard",
      href: routes.operationalManager.places["branch-dashboard"](
        pathname.split("/")[3],
        pathname.split("/")[5]
      ),
      icon: <PiFileImageDuotone />,
    },
    {
      name: "Branch",
      href: "#",
      icon: <MdOutlineLocalGroceryStore />,
      dropdownItems: [
        {
          name: "Edit Branch",
          href: routes.operationalManager.places["edit-branch"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
        {
          name: "Discounts",
          href: routes.operationalManager.places["branch-discounts"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
      ],
    },
    {
      name: "Managers",
      href: "#",
      icon: <FaUserTie />,
      dropdownItems: [
        {
          name: "Managers",
          href: routes.operationalManager.places["branch-manager"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
        {
          name: "Create",
          href: routes.operationalManager.places["create-branch-manager"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
      ],
    },
    {
      name: "Members",
      href: "#",
      icon: <CiUser />,
      dropdownItems: [
        {
          name: "List",
          href: routes.operationalManager.places["list-members"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
      ],
    },
    {
      name: "Products",
      href: "#",
      icon: <CgProductHunt />,
      dropdownItems: [
        {
          name: "List",
          href: routes.operationalManager.places["list-products"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
        {
          name: "Discounts",
          href: routes.operationalManager.places["product-discounts"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
        {
          name: "Claimed Discounts",
          href: routes.operationalManager.places["claimed-product-discounts"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
      ],
    },
    {
      name: "Package",
      href: "#",
      icon: <PiNotepadDuotone />,
      dropdownItems: [
        {
          name: "List",
          href: routes.operationalManager.places["list-packages"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
        {
          name: "Discounts",
          href: routes.operationalManager.places["package-discounts"](
            pathname.split("/")[3],
            pathname.split("/")[5]
          ),
        },
      ],
    },
  ];
};

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
