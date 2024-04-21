import { AdminPrivateLayout, AdminPublicLayout } from "../../layouts";
import publicRoutes from "./public.route";
import privateRoutes from "./private.route";
import { AdminLogin } from "../../pages";

export const adminRoutes = (t) => {
  const islogin = localStorage.getItem("loginToken");
// console.log("islogin", islogin);
  return [
    {
      element: <AdminPublicLayout />,
      children: [...publicRoutes(t)],
    },
    {
      element: islogin ? <AdminPrivateLayout /> : <AdminLogin />,
      children: [...privateRoutes(t)],
    },
  ];
};
