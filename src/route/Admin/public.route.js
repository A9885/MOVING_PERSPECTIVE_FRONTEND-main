// import { DesktopOutlined } from "@ant-design/icons";
import { AdminLogin } from "../../pages";
import adminRouteMap from "../../routeControl/adminRouteMap";

export default function route() {
  return [
    {
      path: adminRouteMap.LOGIN.path,
      name: "Admin login",
      key: adminRouteMap.LOGIN.path,
      private: false,
      icon: adminRouteMap.LOGIN.icon,
      element: <AdminLogin />,
    }
  ];
}
