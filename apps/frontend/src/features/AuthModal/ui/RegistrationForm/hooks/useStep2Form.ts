import {
  VerificationCodeType,
  useRegisterUserMutation,
  useVerifyCodeMutation,
} from "@/shared/api";

import { IValues, StepFormProps } from "../model";

interface Input extends StepFormProps {}

export const useStep2Form = ({ nextStep, setLoadingOverlayVisible }: Input) => {
  const [verifyCodeMutation, { error: verifyCodeError }] =
    useVerifyCodeMutation();
  const [registerUserMutation, { error: registerUserError }] =
    useRegisterUserMutation();

  const submitHandler = async ({ code, email, password, name }: IValues) => {
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

  return {
    submitHandler,
    verifyCodeError,
    registerUserError,
  }
};
