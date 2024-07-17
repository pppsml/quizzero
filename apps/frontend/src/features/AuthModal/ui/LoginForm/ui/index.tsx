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

import { useAuthModalContext, FORMS_ENUM } from "../../../model";
import { useLoginForm } from "../hooks";

export const LoginForm = () => {
  const { setCurrentForm } = useAuthModalContext()
  const { form, loginHandler, loginError } = useLoginForm()
  const { getInputProps, onSubmit } = form


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
          loginError
          && <Text c='red'>
            Error: {loginError.message}
          </Text>
        }
        <Group justify="space-between" mt='md'>
          <Anchor c="dimmed" size="sm" onClick={() => setCurrentForm(FORMS_ENUM.REGISTRATION)}>
            Register account
          </Anchor>
          <Button type="submit">Login</Button>
        </Group>
      </Stack>
    </form>
  );
};
