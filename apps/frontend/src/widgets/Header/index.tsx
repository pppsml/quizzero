import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Logo } from "../../shared/ui/Logo";
import classes from "./index.module.css";
import { UserButton } from "@/entities/user/ui/UserButton";
import { LoginWithProviders } from "@/features/AuthModal/ui/LoginWithProviders";
import { User } from "@/shared/api/models.gen";

const randomUser = (): null | User => {
  const number = Math.random()
  if (number > 0.5) {
    return null
  } else {
    return {
      _id: '123',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
      email: 'asd',
      image: '123',
      name: '123',
      roles: ['USER']
    } as User
  }
}

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const user = null

  return (
    <header className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Logo />
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          {
            user 
              ? <UserButton user={user} />
              : <LoginWithProviders />
          }
        </Group>
      </Container>
    </header>
  );
};
