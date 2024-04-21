import { getLocalStorageToken } from ".";
import { baseRoutes } from "../helpers/baseRoutes";
/** ****Function is driver function for authenticate*******
 * ****user and route for which it will**************
 * ****return true and false************************** */

function authDriver(route, userData, pathname) {
  try {
    let checkData = getLocalStorageToken();
    let user = "";
    if (pathname.search(baseRoutes.adminBaseRoutes.replace("/", "")) >= 0) {
      user = "admin";
    } else {
      user = "user";
    }

    let userCheck = userData?.userRole?.role?.role ?? user;

    if (
      (userCheck === "admin" && route?.adminAccess === true) ||
      (userCheck === "user" && route?.commonRoute === true)
    ) {
      return true;
    } else if (route.private && userData?.userRole?.role?.role === user) {
      // ********For secure route**************
      if (!!checkData) {
        return true;
      } else {
        return false;
      }
    } else {
      // **Non secure route****
      if (!!checkData) {
        return false;
      }
      if (route.private === false) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}

export default authDriver;
