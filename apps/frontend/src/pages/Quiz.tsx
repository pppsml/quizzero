import { useParams } from "react-router-dom";

import { useGetQuizByIdQuery } from "@/shared/api";
import { Card, Group, Image, Stack, Title } from "@mantine/core";

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  if (!quizId) {
    return <div>No quiz id</div>;
  }

  const { data } = useGetQuizByIdQuery({ variables: { quizId } });
  if (!data?.getQuizById) {
    return <div>no quiz</div>;
  }
  const quiz = data?.getQuizById;

  return (
    <>
      <div>Quiz id: {quiz._id}</div>
      <div>title: {quiz.title}</div>
      <div>createdBy: {quiz.createdBy.name}</div>
      <div>questions: {quiz.questions.length}</div>
      <div>createdAt: {quiz.createdAt}</div>
      <div>updatedAt: {quiz.updatedAt}</div>
      <Card maw={1200}>
        <Title>{quiz.title}</Title>
        <Group gap={16}>
          <Image height={200} src={quiz.image} alt="quiz preview image" />
          <Stack>
            <div>createdBy: {quiz.createdBy.name}</div>
            <div>questions: {quiz.questions.length}</div>
            <div>createdAt: {quiz.createdAt}</div>
            <div>updatedAt: {quiz.updatedAt}</div>
          </Stack>
        </Group>
      </Card>
    </>
  );
};
