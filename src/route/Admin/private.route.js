import DashboardRoutes from "./Dashboard/index.route";
import SiteSettingsRoutes from "./SiteSettings/index.route";
// import adminAccountRoutes from "./AdminAccount/index.route";
// import manageWorkspaceRoutes from "./ManageWorkspace/index.route";
// import manageSubscriptionRoutes from "./ManageSubscription/index.route";
// import managePromotionsRoutes from "./ManagePromotions/index.route";
// import transactionsHistoryRoutes from "./TransactionsHistory/index.route";
// import rolesAndPermissionsRoutes from "./ManageRoles/index.route";
// import manageQueriesRoutes from "./ManageQueries/index.route";
// import ManageCmsRoutes from "./ManageCms/index.route";
// import masterRoutes from "./Master/index.route";

export default function route() {
  return [
    ...DashboardRoutes(),
    ...SiteSettingsRoutes(),
    // ...adminAccountRoutes(),
    // ...manageWorkspaceRoutes(),
    // ...manageSubscriptionRoutes(),
    // ...managePromotionsRoutes(),
    // ...transactionsHistoryRoutes(),
    // ...rolesAndPermissionsRoutes(),
    // ...masterRoutes(),
    // ...manageQueriesRoutes(),
    // ...ManageCmsRoutes(),
  ];
}
