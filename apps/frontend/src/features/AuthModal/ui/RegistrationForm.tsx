import { useState } from "react";
import { Anchor, Button, Group, Input, PasswordInput, PinInput, Stack, Stepper } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { IconUser } from '@tabler/icons-react'

import { IForms } from "../model";
import { PasswordInputWithStrengthMeter } from "@/shared/ui/PasswordInputWithStrengthMeter";

interface Props {
  setForm: (form: keyof IForms) => void;
}

interface IValues {
  email: string;
  name: string | null;
  password: string;
  passwordConfirm: string;
}

export const RegistrationForm = ({ setForm }: Props) => {
  const [ activeStep, { increment, decrement, set } ] = useCounter(0, { min: 0, max: 2 })
  const [ verificationCodeIsSent, setVerificationCodeIsSent ] = useState(false)

  const { onSubmit, getInputProps } = useForm<IValues>({
    mode: "controlled",
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
    validate: {
      email: isEmail("Incorrect email. Example: qwerty@qwerty.com"),
      password: hasLength({ min: 8 }, "min length 8"),
      passwordConfirm(value, values) {
        if (values.password !== value ) {
          return "Passwords mismatch"
        }
      },
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = (values: IValues) => {
    console.log(values);
  };

  return (
    <Stepper active={activeStep} onStepClick={set} allowNextStepsSelect={false}>

      <Stepper.Step label="User data" icon={<IconUser />}>
        <form onSubmit={onSubmit(increment)}> {/* on submit send to back query is user with email exists and if not exist -> send email with code */}
          <Stack gap='md'>
            <Input.Wrapper label="Name">
              <Input {...getInputProps("name")} />
            </Input.Wrapper>

            <Input.Wrapper label="Email" withAsterisk>
              <Input {...getInputProps("email")} />
            </Input.Wrapper>

            <Input.Wrapper
              label="Password"
              withAsterisk
              description="it is not necessary to fulfill all the conditions"
            >
              <PasswordInputWithStrengthMeter {...getInputProps("password")} />
            </Input.Wrapper>

            <Input.Wrapper label="Confirm password" withAsterisk>
              <PasswordInput {...getInputProps("passwordConfirm")} />
            </Input.Wrapper>
          </Stack>

          <Group justify="space-between" mt="lg">
            <Anchor c='dimmed' size="sm">Forgot password?</Anchor>
            <Button type="submit">Register</Button>
          </Group>
        </form>
      </Stepper.Step>

      <Stepper.Step label="Verify email">
        <form>
          <Group justify="center">
            <Input.Wrapper label="Enter code here" description="You can copy code from mail and paste to input field">
              <PinInput length={8}  />
            </Input.Wrapper>
          </Group>
        </form>     
      </Stepper.Step>

      <Stepper.Step label="Success">

      </Stepper.Step>

    </Stepper>
  );
};
