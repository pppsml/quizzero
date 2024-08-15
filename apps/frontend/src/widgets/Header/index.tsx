import { Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useUserContext } from "@/entities/user";
import { UserButton } from "@/features/UserButton";
import { Logo } from "@/shared/ui/Logo";

import { LoginButton } from "./LoginButton";

interface Props {
  onBurgerMenuClick?: Function;
}

export const Header = ({ onBurgerMenuClick }: Props) => {
  const [opened, { toggle }] = useDisclosure(false);
  const { user, setUser } = useUserContext();

  const burgerMenuClickHandler = () => {
    toggle()
    onBurgerMenuClick?.()
  }

  return (
    <Group h="100%" w="100%" justify="space-between">
      <Logo />
      <Burger opened={opened} onClick={burgerMenuClickHandler} hiddenFrom="xs" size="sm" />
      {user ? <UserButton {...{ user, setUser }} /> : <LoginButton />}
    </Group>
  );
};
