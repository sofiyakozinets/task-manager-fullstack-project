"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Fieldset, Textarea, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";

import { createTask } from "lib/api";
import { TaskFormInput } from "lib/types";
import { getQueryClient } from "lib/utils/getQueryClient";

import ColorPicker from "../ColorPicker";

const CreateTaskForm = ({
  onSubmitCallback
}: {
  onSubmitCallback: () => void;
}) => {
  const {
    formState: { errors, isDirty, touchedFields },
    handleSubmit,
    register,
    setValue,
    watch
  } = useForm<TaskFormInput>({
    defaultValues: {
      color: "WHITE",
      description: "",
      title: ""
    }
    // resolver: yupResolver(yupSchema)
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (): void => {
      getQueryClient().invalidateQueries({ queryKey: ["tasks"] });
    }
  });

  const onSubmit: SubmitHandler<TaskFormInput> = (
    data: TaskFormInput
  ): void => {
    createTaskMutation.mutate(data);
    onSubmitCallback();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Details">
        <TextInput
          data-cy="title-input"
          {...register("title" as keyof TaskFormInput, { required: true })}
          error={touchedFields.title && errors.title?.message}
          label="Title"
          placeholder="Enter title"
          withAsterisk
        />
        <Textarea
          data-cy="description-input"
          {...register("description" as keyof TaskFormInput)}
          autosize
          description="(optional)"
          error={touchedFields.description && errors.description?.message}
          label="Description"
          maxRows={3}
          minRows={2}
          mt="xs"
          placeholder="Enter description"
        />
      </Fieldset>
      <Fieldset className="red" legend="Color" mt="sm">
        <ColorPicker
          onPick={(color) => setValue("color" as keyof TaskFormInput, color)}
          pickedColor={watch("color") ?? "WHITE"}
        />
      </Fieldset>
      <Button
        data-cy="create-task-submit-button"
        disabled={!isDirty}
        fullWidth
        mt="xl"
        size="md"
        type="submit"
        variant="filled"
      >
        Save
      </Button>
    </form>
  );
};

export default CreateTaskForm;
