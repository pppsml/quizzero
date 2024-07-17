import { Dispatch, SetStateAction } from "react";
import { UseFormReturnType } from "@mantine/form";

import type { CreateUserInput } from "@/shared/api";

export interface IValues extends CreateUserInput {
  passwordConfirm: string;
  code: string;
}

export interface StepFormProps {
  form: UseFormReturnType<IValues>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  nextStep: () => void;
  prevStep: () => void;
  setLoadingOverlayVisible: Dispatch<SetStateAction<boolean>>
  closeModal: () => void
}