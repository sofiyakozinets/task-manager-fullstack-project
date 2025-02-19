import * as yup from "yup";

export const yupSchema = yup
  .object({
    color: yup.string().matches(/^(BLUE|GRAY|GREEN|PINK|RED|WHITE|YELLOW)$/),
    description: yup
      .string()
      .max(150, "Description must be 150 characters or fewer"),
    title: yup
      .string()
      .required("Title is required")
      .max(40, "Title must be 40 characters or fewer")
  })
  .required();
