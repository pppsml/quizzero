import { ReactNode } from "react";
import {
  Avatar,
  Badge,
  Card,
  Group,
  Image,
  ScrollArea,
  Text,
} from "@mantine/core";

import classes from "./QuizCard.module.css";

import type { Quiz } from "@/shared/api";

interface Props {
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  quiz: Omit<Quiz, "questions">;
}

export const QuizCard = ({ topContent, bottomContent, quiz }: Props) => {
  return (
    <div
      style={{
        maxWidth: "calc(20rem* var(--mantine-scale))",
      }}
    >
      <Card withBorder padding="lg" radius="md" className={classes.card}>
        <Card.Section mb="sm">
          <Image
            src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            alt="Quiz preview"
            height={180}
          />
        </Card.Section>

        <ScrollArea type="auto">
          <Group gap="xs" wrap="nowrap" pb={16}>
            <Badge w="fit-content" variant="light">
              tag
            </Badge>
            <Badge w="fit-content" variant="light">
              tag
            </Badge>
            <Badge w="fit-content" variant="light">
              tag
            </Badge>
            <Badge w="fit-content" variant="light">
              tag
            </Badge>
            <Badge w="fit-content" variant="light">
              tag
            </Badge>
            <Badge w="fit-content" variant="light">
              tag
            </Badge>
          </Group>
        </ScrollArea>

        <Text fw={700} className={classes.title} mt="xs">
          {quiz.title}
        </Text>

        <Group mt="lg">
          <Avatar src={quiz.createdBy.image} radius="sm" />
          <div>
            <Text fw={500}>{quiz.createdBy.name}</Text>
            <Text fz="xs" c="dimmed">
              {quiz.createdAt}
            </Text>
          </div>
        </Group>

        {bottomContent && (
          <Card.Section className={classes.footer}>
            {bottomContent}
          </Card.Section>
        )}
      </Card>
    </div>
  );
};
