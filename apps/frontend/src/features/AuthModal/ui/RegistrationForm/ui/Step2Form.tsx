import { Button, Group, Input, PinInput, Stack, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

import { StepFormProps } from "../model";
import { useStep2Form } from "../hooks";

export const Step2Form = (props: StepFormProps) => {
  const { form, prevStep } = props;
  const { getInputProps, onSubmit, errors } = form;

  const { submitHandler, registerUserError, verifyCodeError } = useStep2Form(props);

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <Stack justify="center" align="center">
        <Text>A mail with a code has been sent to your email</Text>
        <Input.Wrapper
          label="Enter code here"
          description="You can copy code from mail and paste to input field"
          error={verifyCodeError?.message || errors.code}
        >
          <PinInput
            {...getInputProps("code")}
            length={8}
            error={!!(verifyCodeError?.message || errors.code)}
          />
        </Input.Wrapper>
      </Stack>
      {registerUserError && (
        <Stack align="center" mt="xl" gap="xs">
          <Text>Error while creating user:</Text>
          <Text c="red">{registerUserError.message}</Text>
        </Stack>
      )}
      <Group mt="lg" justify="space-between">
        <Button leftSection={<IconArrowLeft />} onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Verify code</Button>
      </Group>
    </form>
  );
};
