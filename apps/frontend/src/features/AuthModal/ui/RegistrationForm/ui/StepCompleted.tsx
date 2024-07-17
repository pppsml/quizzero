import { Text } from "@mantine/core";

import { StepFormProps } from "../model";
import { useStepCompletedForm } from "../hooks";

export const StepCompleted = (props: StepFormProps) => {
  const { loginError } = useStepCompletedForm(props)

  if (loginError) {
    <Text c='red'>Error: {loginError.message}</Text>
  }

  return (
    <Text>
      User successfully created.
    </Text>
  );
};
