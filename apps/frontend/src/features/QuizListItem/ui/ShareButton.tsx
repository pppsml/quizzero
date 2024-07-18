import { ActionIcon, rem } from "@mantine/core";
import { IconShare } from "@tabler/icons-react";

export const ShareButton = () => (
  <ActionIcon variant="subtle" color="gray">
    <IconShare style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
  </ActionIcon>
);
