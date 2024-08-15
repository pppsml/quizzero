import { Loader, MantineSize, Text, useMantineTheme } from "@mantine/core";

import { QuizListItem } from "@/features/QuizListItem";
import { useGetAllQuizzesQuery } from "@/shared/api";

export const QuizList = () => {
  const theme = useMantineTheme();
  const { data, loading, error } = useGetAllQuizzesQuery();

  // theme.breakpoints
  // xs 576 36em
  // sm 768 48em
  // md 992 62em
  // lg 1200 75em
  // xl 1408 88em
  const breakpoints: Record<MantineSize, number> = Object.entries(theme.breakpoints)
  .reduce((acc, cur) => ({
      ...acc,
      [cur[0]]: Number(cur[1].replace("em", "")) * 16,
    }), {} as Record<MantineSize, number>);
  console.log(breakpoints);

  return (
    <>
      {loading && <Loader />}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 320px)',
        gridAutoRows: 10,
      }}>
        {
          data?.getAllQuizzes.map((quiz) => (
            <QuizListItem quiz={quiz} key={quiz._id} /> 
          ))
        }
      </div>

      {error && <Text c="red">{error.message}</Text>}
    </>
  );
};
