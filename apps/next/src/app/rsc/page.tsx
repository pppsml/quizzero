import { gql } from "@apollo/client";

import { query } from "@/shared/api/client";
import LoginButton from "../components/LoginButton";

export default async function RscPage() {
  const { data: getMeData } = await query({
    query: gql`
      query getme {
        getMe {
          _id
          email
          name
        }
      }
    `,
  });

  const { data: Quizzes } = await query<{}>({
    query: gql`
      query GetAllQuizzes {
        getAllQuizzes {
          _id
          title
          image
          createdBy {
            _id
            email
            name
            image
            roles
            createdAt
          }
          createdAt
          updatedAt
        }
      }
    `,
  });

  return (
    <>
      <div>RscPage: {JSON.stringify(getMeData)}</div>
      <LoginButton />
      <div>
        {Quizzes &&
          (Quizzes as any).getAllQuizzes.map((quiz: any) => (
            <div key={quiz._id}>
              <h2>{quiz.title}</h2>
              <p>{JSON.stringify(quiz)}</p>
            </div>
          ))}
      </div>
    </>
  );
}
