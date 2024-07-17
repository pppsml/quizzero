import { ReactNode } from 'react'
import { IconBrandGoogle } from '@tabler/icons-react'
import { AllowedProviders } from '@repo/types'

export interface Provider {
  title: string;
  name: AllowedProviders;
  icon: ReactNode;
}

export const providers: Provider[] = [
  {
    title: 'Google',
    name: AllowedProviders.GOOGLE,
    icon: <IconBrandGoogle />,
  },
]