import { routes } from "@/config/routes";
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiFileImageDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  // PiImageDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiStackDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiBoundingBoxDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiMagicWandDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
} from "react-icons/pi";

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: "Home",
  },
  // label end
  {
    name: "File Manager",
    href: "/",
    // href: routes.file.dashboard,
    icon: <PiFileImageDuotone />,
  },

  // label start
  {
    name: "Tools",
  },
  // label end
  {
    name: "Form",
    href: "#",
    icon: <PiShoppingCartDuotone />,
    dropdownItems: [
      {
        name: "City",
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
      {
        name: "register experts",
        href: routes.contentCreator.experts.register,
      },
    ],
  },
];
