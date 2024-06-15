import { useState } from "react";
import { Divider, Modal } from "@mantine/core"

import { IForms } from '../model'
import { LoginWithProviders } from "./LoginWithProviders";
import { LoginForm } from "./LoginForm";
import { RegistrationForm } from "./RegistrationForm";

interface Props {
  opened: boolean;
  close: () => void
}

export const AuthModal = ({ opened, close }: Props) => {
  const [ currentForm, setCurrentForm ] = useState<keyof IForms>('Login')
  const [ forms ] = useState<IForms>({
    Login: <LoginForm setForm={setCurrentForm} />,
    Registration: <RegistrationForm setForm={setCurrentForm} />
  })

  return (
    <Modal title={currentForm} opened={opened} onClose={close} size="lg">
      {forms[currentForm]}
      <Divider label="or with" my="lg" />
      <LoginWithProviders />
    </Modal>
  )
}