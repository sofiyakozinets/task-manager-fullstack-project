import { COLORS } from "lib/constants/colors";

export type ID = number | string;

// Union of color names
export type Color = keyof typeof COLORS;

export interface BaseTaskInterface {
  color: Color;
  completed: boolean;
  description?: string;
  title: string;
}

export interface TaskInterface extends BaseTaskInterface {
  id: ID;
}

export type CreateTaskData = Omit<BaseTaskInterface, "completed">;

export type UpdateTaskData = Partial<Omit<TaskInterface, "id">>;

// Task variants enum
export enum TaskVariant {
  Default = "default",
  Expanded = "expanded"
}

type TaskHandlers = {
  onCompleteToggle: () => void;
  onDelete: () => void;
  onOpen: () => void;
};

export type TaskComponentProps<Variant extends TaskVariant> =
  BaseTaskInterface &
    (Variant extends TaskVariant.Default
      ? TaskHandlers
      : Omit<TaskHandlers, "onOpen">);
