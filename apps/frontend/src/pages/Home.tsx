import { Group } from "@mantine/core"

import { QuizCard } from "@/entities/quiz"

export const HomePage = () => {
  return (
    <>
      <p>Homepage</p>
      <Group
        wrap="wrap"
      >
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
      </Group>
    </>
  )
}