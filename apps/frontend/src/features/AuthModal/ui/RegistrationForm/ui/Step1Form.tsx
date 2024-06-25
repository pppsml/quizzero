import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";

import { PasswordInputWithStrengthMeter } from "@/shared/ui/PasswordInputWithStrengthMeter";
import { useGetEmailConfirmationMailLazyQuery, useUserWithEmailExistsLazyQuery } from "@/shared/api/schema.gen";

import { IValues, StepFormProps } from "../model";

export const Step1Form = ({
  form,
  activeStep,
  setActiveStep,
  nextStep,
  setLoadingOverlayVisible,
}: StepFormProps) => {
  const { getInputProps, onSubmit, setFieldError } = form

  const [userExistsQuery] =
    useUserWithEmailExistsLazyQuery({
      fetchPolicy: "no-cache",
    });
  const [getEmailConfirmationMail] = useGetEmailConfirmationMailLazyQuery();

  const submitHandler = async ({ email }: IValues) => {
    setLoadingOverlayVisible(true)
    const { data: userExistsQueryData } = await userExistsQuery({
      variables: {
        email,
      },
    });

    if (userExistsQueryData?.userWithEmailExists) {
      setLoadingOverlayVisible(false)
      setFieldError("email", `User with email "${email}" already exists`);
      return;
    }

    const { data: getEmailConfirmationMailData } =
      await getEmailConfirmationMail({
        variables: {
          email,
        },
        fetchPolicy: "no-cache",
      });

    setLoadingOverlayVisible(false)

    if (getEmailConfirmationMailData?.getEmailConfirmationMail) {
      nextStep();
    }
  };

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
