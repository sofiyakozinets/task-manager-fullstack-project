import { COLORS } from "lib/constants/colors";

export type ID = number | string;

export interface IDInterface {
  id: ID;
}

export interface CompletedInterface {
  completed: boolean;
}

export type Color = keyof typeof COLORS;

export interface BaseTaskInterface {
  color: Color;
  completed: boolean;
  description?: string;
  title: string;
}

export interface TaskInterface extends BaseTaskInterface, IDInterface {}

// export type TaskFormInput = InferType<typeof yupSchema>;
export type TaskFormInput = {
  color: Color;
  description?: string;
  title: string;
};
