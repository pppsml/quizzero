import { useState } from "react";
import { Divider, Modal } from "@mantine/core"

import { AuthModalContext, FORMS_ENUM, Forms } from '../model'
import { LoginWithProviders } from "./LoginWithProviders";

interface Props {
  opened: boolean;
  close: () => void;
}

export const AuthModal = ({ opened, close }: Props) => {
  const [ currentForm, setCurrentForm ] = useState<FORMS_ENUM>(FORMS_ENUM.LOGIN)

  return (
    <Modal title={currentForm} opened={opened} onClose={close} size="lg">
      <AuthModalContext.Provider value={{ closeModal: close, currentForm, setCurrentForm }}>
        {Forms[currentForm]}
      </AuthModalContext.Provider>
      <Divider label="or login with" my="lg" />
      <LoginWithProviders />
    </Modal>
  )
}