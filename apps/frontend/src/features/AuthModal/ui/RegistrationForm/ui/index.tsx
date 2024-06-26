import { useEffect, useState } from "react";
import {
  Button,
  LoadingOverlay,
  Stack,
  Stepper,
  Text,
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { IconCheck, IconUser } from "@tabler/icons-react";
import { CODE_LENGTH } from "@repo/types";

import { IValues, StepFormProps } from "../model";
import { IForms } from "../../../model";
import { Step1Form } from "./Step1Form";
import { Step2Form } from "./Step2Form";

interface Props {
  setForm: (form: keyof IForms) => void;
}

export const RegistrationForm = ({ setForm }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () =>
    setActiveStep((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  const [loadingOverlayIsVisible, setLoadingOverlayVisible] = useState(false);
  const [redirectTime, setRedirectTime] = useState(10);
  const redirectInterval = useInterval(() => {
    setRedirectTime((prev) => prev - 1);
  }, 1e3);

  const form = useForm<IValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      code: "",
    },
    validate: {
      email: isEmail("Uncorrect email. Example: qwerty@qwerty.com"),
      password: hasLength(
        { min: 8, max: 32 },
        "Password length must be between 8 and 32 character length"
      ),
      passwordConfirm(value, values) {
        if (value !== values.password) {
          return "Passwords must match";
        }
      },
      code(value) {
        if (activeStep === 0) {
          return null;
        } else if (activeStep === 1) {
          return hasLength(
            { min: CODE_LENGTH, max: CODE_LENGTH },
            "Invalid code"
          )(value);
        }
      },
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (activeStep === 2 && redirectTime >= 1) {
      redirectInterval.start();
    }

    if (redirectTime <= 0) {
      setForm('Login')
      redirectInterval.stop();
    }

    return () => {
      redirectInterval.stop();
    };
  }, [activeStep, redirectTime]);

  const stepProps: StepFormProps = {
    form,
    activeStep,
    nextStep,
    prevStep,
    setActiveStep,
    setLoadingOverlayVisible,
  };

  return (
    <>
      <LoadingOverlay visible={loadingOverlayIsVisible} />
      <Stepper active={activeStep} allowNextStepsSelect={false}>
        <Stepper.Step label="User data" icon={<IconUser />}>
          <Step1Form {...stepProps} />
        </Stepper.Step>

        <Stepper.Step label="Verify email" icon={<IconCheck />}>
          <Step2Form {...stepProps} />
        </Stepper.Step>

        <Stepper.Completed>
          <Stack>
            <Text ta="center">User successfully created.</Text>
            <Text ta="center">
              Через {redirectTime} секунд вы будете перенаправлены на форму входа
            </Text>
            <Button onClick={() => setForm("Login")}>Перейти сейчас</Button>
          </Stack>
        </Stepper.Completed>
      </Stepper>
    </>
  );
};
