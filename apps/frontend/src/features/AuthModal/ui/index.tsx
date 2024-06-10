import { Modal } from "@mantine/core"

import { LoginWithProviders } from "./LoginWithProviders";

interface Props {
  opened: boolean;
  close: () => boolean
}

export const AuthModal = ({ opened, close }: Props) => {
  return (
    <Modal opened={opened} onClose={close}>
      <LoginWithProviders />
    </Modal>
  )
}