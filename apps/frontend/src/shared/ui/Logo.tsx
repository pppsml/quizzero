import { Flex, Text, useComputedColorScheme, useMantineTheme } from '@mantine/core'
import { Link } from 'react-router-dom'

import icon from '@/assets/img/q-icon.svg'

export const Logo = () => {
  const colorScheme = useComputedColorScheme()
  const theme = useMantineTheme()

  return (
    <Link to='/' style={{ textDecoration: 'none', }}>
      <Flex align='baseline' mb={-4}>
        <img 
          width={18}
          src={icon} 
          />
        <Text ml={1} fw={600} lts={1} c={colorScheme == 'dark' ? theme.colors.dark[0] : theme.black}>
          UIZZERO
        </Text>
      </Flex>
    </Link>
  )
}