import { Button, Group, Input, PinInput, Stack, Text } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

import {
  useRegisterUserMutation,
  useVerifyCodeMutation,
} from "@/shared/api/schema.gen";
import { VerificationCodeType } from "@/shared/api/models.gen";

import { IValues, StepFormProps } from "../model";

export const Step2Form = ({
  form,
  nextStep,
  prevStep,
  setLoadingOverlayVisible,
}: StepFormProps) => {
  const { getInputProps, onSubmit, errors } = form;

  const [verifyCodeMutation, { error: verifyCodeError }] =
    useVerifyCodeMutation();
  const [registerUserMutation, { error: registerUserError }] =
    useRegisterUserMutation();

  const step2Submit = async ({ code, email, password, name }: IValues) => {
    setLoadingOverlayVisible(true);
    const { data: verifyCodeData } = await verifyCodeMutation({
      variables: {
        input: {
          code,
          email,
          type: VerificationCodeType.Email,
        },
      },
    }).finally(() => setLoadingOverlayVisible(false));

    if (!verifyCodeData?.verifyCode) return;

    const { data: registerUserData } = await registerUserMutation({
      variables: {
        input: {
          email,
          password,
          name,
        },
      },
    })
      .catch((err) => {
        console.log(err.message);
        return err;
      })
      .finally(() => setLoadingOverlayVisible(false));

    if (registerUserData?.registerUser._id) {
      nextStep();
    }
  };

  return (
    <form onSubmit={onSubmit(step2Submit)}>
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
