import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";

import { PasswordInputWithStrengthMeter } from "@/shared/ui/PasswordInputWithStrengthMeter";

import { StepFormProps } from "../model";
import { useStep1Form } from "../hooks";

export const Step1Form = (props: StepFormProps) => {
  const { getInputProps, onSubmit } = props.form
  
  const { submitHandler } = useStep1Form(props)

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      {/* on submit send to back query is user with email exists and if not exist -> send email with code */}
      <Stack gap="md">
        <TextInput {...getInputProps("name")} label="Name" name="name" />
        <TextInput
          {...getInputProps("email")}
          label="Email"
          withAsterisk
          type="email"
          name="email"
        />
        <PasswordInputWithStrengthMeter
          {...getInputProps("password")}
          description="It is not necessary to fulfill all the conditions"
          label="Password"
          name="password"
          withAsterisk
        />
        <PasswordInput
          {...getInputProps("passwordConfirm")}
          label="Confirm password"
          name="confirmPassword"
          withAsterisk
        />

        <Button type="submit" w="100%" mt="xs">
          Register
        </Button>
      </Stack>
    </form>
  );
};
