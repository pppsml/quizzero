import { Group } from "@mantine/core";

import { Quiz } from "@/shared/api";
import { QuizCard } from "@/entities/quiz";

import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
// import { ShareButton } from "./ShareButton";

interface Props {
  quiz: Omit<Quiz, "questions">;
}

export const QuizListItem = ({ quiz }: Props) => {
  return (
    <>
      <QuizCard
        quiz={quiz}
        size={quiz.image ? "lg" : "sm"} 
        bottomContent={
          <Group gap={0}>
            <LikeButton />
            <CommentButton />
            {/* <ShareButton /> */}
          </Group>
        }
      />
    </>
  );
};
