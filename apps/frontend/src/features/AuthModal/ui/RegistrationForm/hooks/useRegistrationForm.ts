import { useState } from "react";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { CODE_LENGTH } from "@repo/types";

import { IValues } from "../model";

export const useRegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () =>
    setActiveStep((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActiveStep((current) => (current > 0 ? current - 1 : current));
  const [loadingOverlayIsVisible, setLoadingOverlayVisible] = useState(false);

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

  return {
    activeStep,
    setActiveStep,
    nextStep,
    prevStep,
    form,
    loadingOverlayIsVisible,
    setLoadingOverlayVisible,
  }
}