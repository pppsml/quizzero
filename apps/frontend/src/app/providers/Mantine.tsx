import { FC, PropsWithChildren } from 'react'
import { MantineProvider as LibMantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'

export const MantineProvider: FC = ({ children }: PropsWithChildren) => {
  return (
    <LibMantineProvider
      theme={{
        fontFamily: 'Montserrat',
      }}
      defaultColorScheme='auto'
    >
      {children}
    </LibMantineProvider>
  )
}