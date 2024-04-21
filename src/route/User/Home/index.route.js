import { Home} from "../../../pages";
import routesMap from "../../../routeControl/userRouteMap";

export default function route() {
  return [
    {
        path: routesMap.HOME.path,
        name: "",
        key: routesMap.HOME.path,
        commonRoute: true,
        private: false,
        element: <Home/>,
      },
  ];
}
