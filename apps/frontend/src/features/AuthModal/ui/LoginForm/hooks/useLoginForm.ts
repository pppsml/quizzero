import { hasLength, isEmail, useForm } from "@mantine/form";

import { LoginInput, User, useLoginMutation } from "@/shared/api";
import { useUserContext } from "@/entities/user/model/context";

interface IValues extends LoginInput {}

export const useLoginForm = () => {
  const { setUser } = useUserContext()
  const [loginMutation, { error: loginError }] = useLoginMutation();

  const form = useForm<IValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: isEmail("Uncorrect email. Example: qwerty@qwerty.com"),
      password: hasLength(
        { min: 8, max: 32 },
        "Password length must be between 8 and 32 character length"
      ),
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const loginHandler = async (values: IValues) => {
    const { data } = await loginMutation({
      variables: {
        input: values,
      },
    });

    if (data?.login) {
      setUser(data.login)
    }
  };

  return {
    form,
    loginHandler,
    loginError,
  }
}