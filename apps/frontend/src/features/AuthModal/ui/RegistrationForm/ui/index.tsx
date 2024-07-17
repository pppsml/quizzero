import { LoadingOverlay, Stepper } from "@mantine/core";
import { IconCheck, IconUser } from "@tabler/icons-react";

import { StepProps } from "../model";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
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
  
  const stepProps: StepProps = {
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
          <Step1 {...stepProps} />
        </Stepper.Step>

        <Stepper.Step label="Verify email" icon={<IconCheck />}>
          <Step2 {...stepProps} />
        </Stepper.Step>
        <Stepper.Completed>
          <StepCompleted {...stepProps} />
        </Stepper.Completed>
      </Stepper>
    </>
  );
};
