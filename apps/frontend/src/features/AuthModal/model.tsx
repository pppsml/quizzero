import { FC } from 'react'
import { IconBrandGoogle } from '@tabler/icons-react'
import { AllowedProviders } from '@repo/types'

export interface Provider {
  provider: AllowedProviders,
  icon: FC
}

export const providers: Provider[] = [
  {
    provider: AllowedProviders.GOOGLE,
    icon: IconBrandGoogle,
  },
]