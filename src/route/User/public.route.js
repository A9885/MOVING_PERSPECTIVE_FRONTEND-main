// import authRoute from "./Auth/index.route";
// import videoCallRoute from "./VideoCall/index.route";
import home from "./Home/index.route"
// import homeTwo from "./HomeTwo/index.route"

export default function route(t) {
  return [
    // ...authRoute(t),
    // ...videoCallRoute(t),
    ...home(),
    // ...homeTwo(),
  ];
}
