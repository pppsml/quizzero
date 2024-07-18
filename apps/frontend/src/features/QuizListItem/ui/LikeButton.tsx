import { Button, rem, useMantineTheme } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

export const LikeButton = () => {
  const theme = useMantineTheme();

  return (
    <Button
      variant="subtle"
      color="gray"
      leftSection={
        <IconHeart
          style={{ width: rem(20), height: rem(20) }}
          color={theme.colors.red[6]}
          stroke={1.5}
        />
      }
    >
      733
    </Button>
  );
};
