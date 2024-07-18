import { Loader, Text } from "@mantine/core";

import { QuizListItem } from "@/features/QuizListItem";
import { useGetAllQuizzesQuery } from "@/shared/api";

export const QuizList = () => {
  const { data, loading, error } = useGetAllQuizzesQuery();

  return (
    <>
      {loading && <Loader />}
      {data?.getAllQuizzes.length &&
        data?.getAllQuizzes.map((quiz) => (
          <QuizListItem quiz={quiz} key={quiz._id} />
        ))}
      {error && <Text c="red">{error.message}</Text>}
    </>
  );
};
