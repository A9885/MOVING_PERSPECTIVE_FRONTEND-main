import i18next from "i18next";
import * as yup from "yup";

export default function validation() {
  return yup.object().shape({
    boatId: yup.string().required(i18next.t("validation.adminReview.boat")),
    content: yup
      .string()
      .required(i18next.t("validation.adminReview.reviewContent"))
      .min(3, i18next.t("validation.common.minCharacters"))
      .trim(i18next.t("validation.common.noSpace"))
      .strict(true),
  });
}