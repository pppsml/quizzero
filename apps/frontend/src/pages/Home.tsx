import { Group } from "@mantine/core"

import { QuizList } from "@/widgets/QuizList"

export const HomePage = () => {
  return (
    <>
      <p>Homepage</p>
      <Group
        wrap="wrap"
      >
        <QuizList />
      </Group>
    </>
  )
}