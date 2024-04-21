import { userAuth, userHome, footer } from "./User";

export default function lang() {
  return {
    text: {
      userHome: userHome.text,
      userAuth: userAuth.text,
      footer: footer.text,
    },
    validation: { auth: userAuth.validation },
  };
}
