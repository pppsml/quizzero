import { ActionIcon, Group } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export const Footer = () => (
  <Group h="100%" w="100%" justify="center">
    <ActionIcon
      component="a"
      href="https://github.com/pppsml/quizzero"
      target="_blank"
      title="Quizzero on github"
      variant="subtle"
      color="gray"
    >
      <IconBrandGithub />
    </ActionIcon>
  </Group>
);
