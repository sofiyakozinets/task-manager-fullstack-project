import * as yup from "yup";

import { COLORS } from "lib/constants/colors";
import { Color } from "lib/types";

export const yupSchema = yup
  .object({
    color: yup
      .string()
      .oneOf(Object.keys(COLORS) as Array<Color>)
      .required(),
    description: yup
      .string()
      .max(150, "Description must be 150 characters or fewer"),
    title: yup
      .string()
      .required("Title is required")
      .max(40, "Title must be 40 characters or fewer")
  })
  .required();
