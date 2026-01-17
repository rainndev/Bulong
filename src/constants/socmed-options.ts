import { SocmedTypes } from "@/types/socmed.types";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa";
import { PiSnapchatLogoFill } from "react-icons/pi";

export const socmedOptions: SocmedTypes[] = [
  {
    name: "Facebook",
    shortName: "FB",
    icon: FaFacebook,
  },

  {
    name: "Instagram",
    shortName: "IG",
    icon: BiLogoInstagramAlt,
  },

  {
    name: "Snapchat",
    shortName: "SNAP",
    icon: PiSnapchatLogoFill,
  },
];
