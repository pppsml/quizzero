import { useEffect } from "react";
import { useUserContext } from "@/entities/user/model/context";

import { useLoginMutation } from "@/shared/api";
import { StepFormProps } from "../model";

interface Input extends StepFormProps {}

export const useStepCompletedForm = ({
  form,
  setLoadingOverlayVisible,
  closeModal,
}: Input) => {
  const { setUser } = useUserContext();
  const [loginMutation, { error: loginError }] = useLoginMutation();

  useEffect(() => {
    setLoadingOverlayVisible(true);
    const { email, password } = form.getValues();
    loginMutation({
      variables: {
        input: {
          email,
          password,
          rememberMe: true,
        },
      },
    })
    .then((data) => {
      const user = data.data?.login;
      if (user) {
        setUser(user);
        // TODO show notification with message user created
        closeModal();
      }
    })
    .finally(() => setLoadingOverlayVisible(false));
  }, []);

  return {
    loginError
  }
};
