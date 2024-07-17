import { useContext } from "react";
import { Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Logo } from "../../../../shared/ui/Logo";
import classes from "./index.module.css";
import { LoginButton } from "./LoginButton";
import { UserButton } from "@/entities/user/ui/UserButton";
import { UserContext } from "@/entities/user";
import { useLogoutMutation } from "@/shared/api";

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { user, setUser } = useContext(UserContext);
  const [logoutMutation] = useLogoutMutation();

  const logoutHandler = async () => {
    const { data } = await logoutMutation()

    if (data?.logout) setUser(null);
  };

  return (
    <header className={classes.header}>
      <Container className={classes.mainSection} size="xl">
        <Group justify="space-between">
          <Logo />
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          {user ? <UserButton user={user} logoutHandler={logoutHandler} /> : <LoginButton />}
        </Group>
      </Container>
    </header>
  );
};
