import { ActionIcon, Container, Group, rem } from "@mantine/core"

import classes from './index.module.css'
import { Logo } from "../../../../shared/ui/Logo"
import { IconBrandGithub } from "@tabler/icons-react"

export const Footer = () => {


  return (
    <div className={classes.footer_root}>
      <div className={classes.footer__spacer} />
      <footer className={classes.footer}>
        <Container className={classes.inner} size='xl'>
          <Logo />
          <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
            <ActionIcon size='lg' color="gray" variant="subtle">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </footer>
    </div>
  )
}