import { useMemo } from 'react'
import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Logo } from "../../shared/ui/Logo";
import classes from "./index.module.css";
import { LoginButton } from "./LoginButton";
import { UserButton } from "@/entities/user/ui/UserButton";
import { User } from "@/shared/api/models.gen";

const randomUser = (): null | User => {
  const number = Math.random()
  return null
  if (number > 0.5) {
  } else {
    return {
      _id: '123',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      email: 'asd',
      image: '123',
      name: '123',
      roles: ['USER'],
    } as User
  }
}

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const user = useMemo(() => randomUser(), [])

  return (
    <header className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Logo />
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          {
            user 
              ? <UserButton user={user} />
              : <LoginButton />
          }
        </Group>
      </Container>
    </header>
  );
};
