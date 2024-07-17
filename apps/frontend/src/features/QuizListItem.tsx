import { QuizCard } from '@/entities/quiz'
import type { Quiz } from '@/shared/api'

interface Props {
  quiz: Quiz
}

export const QuizListITem = ({}: Props) => {
  
  return (
    <QuizCard />
  )
}