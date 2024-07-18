import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useUserContext } from "@/entities/user";
import { UserButton } from "@/features/UserButton";
import { Logo } from "@/shared/ui/Logo";

import { LoginButton } from "./LoginButton";

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { user, setUser } = useUserContext();

  return (
    <Group h="100%" w="100%" justify="space-between">
      <Logo />
      <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      {user ? <UserButton {...{ user, setUser }} /> : <LoginButton />}
    </Group>
  );
};
