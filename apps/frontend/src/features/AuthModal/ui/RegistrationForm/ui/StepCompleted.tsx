import { Text } from "@mantine/core";
import { useContext, useEffect } from "react";

import { useLoginMutation } from "@/shared/api/schema.gen";
import { UserContext } from "@/entities/user";

import { StepFormProps } from "../model";

export const StepCompleted = ({
  form,
  setLoadingOverlayVisible,
  closeModal,
}: StepFormProps) => {
  const { setUser } = useContext(UserContext)
  const [loginMutation, { error }] = useLoginMutation();
  

  useEffect(() => {
    setLoadingOverlayVisible(true)
    const { email, password } = form.getValues()
    loginMutation({
      variables: {
        input: {
          email,
          password,
          rememberMe: true,
        }
      }
    })
    .then((data) => {
      const user = data.data?.login
      if (user) {
        setUser(user)
        closeModal()
      }
    })
    .finally(() => setLoadingOverlayVisible(false))
  }, [])

  if (error) {
    <Text c='red'>Error: {error.message}</Text>
  }

  return (
    <Text>
      User successfully created.
    </Text>
  );
};
