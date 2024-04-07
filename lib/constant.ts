import { url } from "inspector";
import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    url: "/collections",
    label: "Collections",
    icon: Shapes,
  },
  {
    url: "/products",
    label: "Products",
    icon: Tag,
  },
  {
    url: "/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    url: "/customers",
    label: "Customers",
    icon: UsersRound,
  },
];
