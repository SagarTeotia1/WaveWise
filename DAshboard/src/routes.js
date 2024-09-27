// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Games from "layouts/games"; // Import Games component
import Webinars from "layouts/webinars"; // Import Webinars component
import Vlog from "layouts/vlog"; // Import Vlog component

// Vision UI Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

const routes = [
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <IoStatsChart size="15px" color="inherit" />,
  //   component: Tables,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <BsCreditCardFill size="15px" color="inherit" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Games",
    key: "games",
    route: "/games",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Games,
    noCollapse: true,
  },
 
  {
    type: "collapse",
    name: "Blog",
    key: "vlog",
    route: "/blog",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Vlog,
    noCollapse: true,
  },
  
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
];

export default routes;
