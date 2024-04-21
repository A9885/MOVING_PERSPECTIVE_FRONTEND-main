import loadable from "@loadable/component";

export const ActionDropdown = loadable(() => import("./ActionDropdown/index"));
export const SectionHeading = loadable(() => import("./SectionHeading/index"));
export const UserHeader = loadable(() => import("./Header/index"));
export const GlobalLoader = loadable(() => import("./GlobalLoader/index"));
export const VideComponent = loadable(() => import("./VideoComponent/index"));
export const ImageElement = loadable(() => import("./ImageElement/index"));
export const SweetAlert = loadable(() => import("./SweetAlert/index"));
export const CommonButton = loadable(() => import("./CommonButton/index"));

export const UserFooter = loadable(() => import("./Footer/index"));
export const LoginHeader = loadable(() => import("./LoginHeader/index"));
export const LoginSidebar = loadable(() => import("./LoginSidebar/index"));
