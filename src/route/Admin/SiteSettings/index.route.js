

import { SiteSettings } from "../../../pages";
import adminRouteMap from "../../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.SITESETTINGS.path,
      name: "Site settings",
      key: adminRouteMap.SITESETTINGS,
      private: true,
      belongsToSidebar: true,
      icon: adminRouteMap.SITESETTINGS.icon,
      element: <SiteSettings />,
    },
  ];
}
