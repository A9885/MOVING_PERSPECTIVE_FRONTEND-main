import { baseRoutes } from "../../../helpers/baseRoutes";

const accessRoute = {
    SITESETTINGS: {
      path: `${baseRoutes.adminBaseRoutes}/sitesettings`,
      icon: (
        <span className="nk-menu-icon">
          <em className="icon ni ni-grid-alt" />
        </span>
      ),
    },
  };
  
  export default accessRoute;
  