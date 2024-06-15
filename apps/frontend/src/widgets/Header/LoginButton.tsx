import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogin2 } from '@tabler/icons-react'

import { AuthModal } from '@/features/AuthModal/ui'

export const LoginButton = () => {
  const [ opened, { close, open } ] = useDisclosure()

  return (
    <>
      <Button leftSection={<IconLogin2 />} onClick={open}>
        Login
      </Button>
      <AuthModal opened={opened} close={close}/>
    </>
  )
}