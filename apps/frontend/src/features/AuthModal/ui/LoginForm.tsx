import { useContext } from "react";
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";

import { useLoginMutation } from "@/shared/api/schema.gen";
import { LoginInput } from "@/shared/api/models.gen";
import { UserContext } from "@/entities/user";

import { IForms } from "../model";

interface Props {
  setForm: (form: keyof IForms) => void;
  closeModal: () => void;
}

interface IValues extends LoginInput {}

export const LoginForm = ({ setForm }: Props) => {
  const { setUser } = useContext(UserContext)
  const [loginMutation, { error }] = useLoginMutation();

  const { getInputProps, onSubmit } = useForm<IValues>({
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

  return (
    <form onSubmit={onSubmit(loginHandler)}>
      <Stack gap="md">
        <TextInput {...getInputProps("email")} label="Email" name="email" withAsterisk />
        <PasswordInput
          {...getInputProps("password")}
          label="Password"
          name="password"
          type="email"
          withAsterisk
        />
        <Checkbox
          {...getInputProps("rememberMe", { type: "checkbox" })}
          label="Remember me"
          name="rememberMe"
        />
        {
          error
          && <Text c='red'>
            Error: {error.message}
          </Text>
        }
        <Group justify="space-between" mt='md'>
          <Anchor c="dimmed" size="sm" onClick={() => setForm("Registration")}>
            Register account
          </Anchor>
          <Button type="submit">Login</Button>
        </Group>
      </Stack>
    </form>
  );
};
