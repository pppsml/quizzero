import { Text } from "@mantine/core";

import { StepProps } from "../model";
import { useStepCompleted } from "../hooks";

export const StepCompleted = (props: StepProps) => {
  const { loginError } = useStepCompleted(props)

  if (loginError) {
    <Text c='red'>Error: {loginError.message}</Text>
  }

  return (
    <Text>
      User successfully created.
    </Text>
  );
};
