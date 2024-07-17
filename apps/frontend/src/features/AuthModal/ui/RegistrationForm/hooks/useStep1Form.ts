import {
  useGetEmailConfirmationMailLazyQuery,
  useUserWithEmailExistsLazyQuery,
} from "@/shared/api";

import { IValues, StepFormProps } from "../model";

interface Input extends StepFormProps {}

export const useStep1Form = ({
  form,
  nextStep,
  setLoadingOverlayVisible
}: Input) => {
  const { setFieldError } = form;

  const [userExistsQuery] = useUserWithEmailExistsLazyQuery({
    fetchPolicy: "no-cache",
  });
  const [getEmailConfirmationMail] = useGetEmailConfirmationMailLazyQuery();

  const submitHandler = async ({ email }: IValues) => {
    setLoadingOverlayVisible(true);
    const { data: userExistsQueryData } = await userExistsQuery({
      variables: {
        email,
      },
    });

    if (userExistsQueryData?.userWithEmailExists) {
      setLoadingOverlayVisible(false);
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

    setLoadingOverlayVisible(false);

    if (getEmailConfirmationMailData?.getEmailConfirmationMail) {
      nextStep();
    }
  };

  return {
    submitHandler,
  }
};
