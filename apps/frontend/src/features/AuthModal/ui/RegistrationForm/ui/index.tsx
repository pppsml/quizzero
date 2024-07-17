import { LoadingOverlay, Stepper } from "@mantine/core";
import { IconCheck, IconUser } from "@tabler/icons-react";

import { StepFormProps } from "../model";
import { Step1Form } from "./Step1Form";
import { Step2Form } from "./Step2Form";
import { StepCompleted } from "./StepCompleted";
import { useRegistrationForm } from "../hooks";

export const RegistrationForm = () => {
  const {
    activeStep,
    setActiveStep,
    nextStep,
    prevStep,
    form,
    loadingOverlayIsVisible,
    setLoadingOverlayVisible,
  } = useRegistrationForm()

  const stepProps: StepFormProps = {
    form,
    activeStep,
    nextStep,
    prevStep,
    setActiveStep,
    setLoadingOverlayVisible,
    closeModal: close,
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
          <StepCompleted {...stepProps} />
        </Stepper.Completed>
      </Stepper>
    </>
  );
};
