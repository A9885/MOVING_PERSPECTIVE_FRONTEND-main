// import userManagement from "./UserManagement";
// import manageWorkspace from "./ManageWorkspace";
import auth from "./Auth";
import dashboard from "./Dashboard";
import sitesettings from "./SiteSettings";
// import manageCms from "./ManageCms/index";
// import master from "./Master/index";
// import adminProfile from "./AdminAccount/index";
// import manageQueries from "./ManageQueries/index";
// import transactionsHistory from "./TransactionsHistory/index";
// import ManageRoles from "./ManageRoles/index";
// import manageSubscription from "./ManageSubscription/index";
// import managePromotions from "./ManagePromotions/index";

const AccessControl = {
    // ...userManagement,
    ...auth,
    ...dashboard,
    ...sitesettings,
    // ...manageCms,
    // ...master,
    // ...adminProfile,
    // ...manageQueries,
    // ...manageWorkspace,
    // ...transactionsHistory,
    // ...ManageRoles,
    // ...manageSubscription,
    // ...managePromotions,
};

export default AccessControl;
