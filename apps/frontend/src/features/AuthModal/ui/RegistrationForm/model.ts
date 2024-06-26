import { Dispatch, SetStateAction } from "react";
import { UseFormReturnType } from "@mantine/form";

import { CreateUserInput } from "@/shared/api/models.gen";

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