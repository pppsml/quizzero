

import { ActionIcon } from '@mantine/core'
import { providers } from '../model'

export const LoginWithProviders = () => {
  const providersButtons = providers.map(
    prov => <ActionIcon key={prov.provider} title={prov.provider} variant='default'>
      <prov.icon></prov.icon>
    </ActionIcon>
  )

  return (
    <>
      {providersButtons}
    </>
  )
}