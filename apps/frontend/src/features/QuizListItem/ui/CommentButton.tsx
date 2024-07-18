import { Button, rem } from "@mantine/core";
import { IconMessage2 } from "@tabler/icons-react";

export const CommentButton = () => (
  <Button
  variant="subtle"
  color="gray"
  px='xs'
  leftSection={
    <IconMessage2
      style={{ width: rem(20), height: rem(20) }}
      stroke={1.5}
    />
  }
>
  733
</Button>
);
