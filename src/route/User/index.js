import { UserPrivateLayout, UserPublicLayout } from "../../layouts";
import privateRoutes from "./private.route";
import publicRoutes from "./public.route";

export const userRoutes = (t) => {
  return [
    {
      element: <UserPublicLayout />,
      children: [...publicRoutes(t)],
    },
    {
      element: <UserPrivateLayout />,
      children: [...privateRoutes(t)],
    },
  ];
};