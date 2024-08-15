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
import { clsx } from 'clsx'
import { Link } from "react-router-dom";

import classes from "./QuizCard.module.css";

import type { Quiz } from "@/shared/api";

interface Props {
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  quiz: Omit<Quiz, "questions">;
  size?: "lg" | "sm";
}

export const QuizCard = ({ topContent, bottomContent, quiz, size = "lg" }: Props) => {
  return (
    <div className={clsx(classes.cardWrapper, classes[size])}>
      <Card withBorder padding="lg" radius="md" className={classes.card}>

        {quiz.image && (
          <Card.Section mb="sm">
            <Link to={`/quiz/${quiz._id}`}>
              <Image
                src={quiz.image}
                alt="Quiz preview"
                height={180}
              />
            </Link>
          </Card.Section>
        )}
        
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
