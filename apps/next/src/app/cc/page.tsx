"use client";
import { useUserContext } from "@/entities/user/model/context";
import { gql, useMutation, useSuspenseQuery } from "@apollo/client";

export default function CcPage() {
  const { data: getMeData } = useSuspenseQuery(
    gql`
      query getme {
        getMe {
          _id
          email
          name
        }
      }
    `,
    { fetchPolicy: "no-cache" }
  );

  const { data: Quizzes } = useSuspenseQuery<{}>(
    gql`
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
    { fetchPolicy: "no-cache" }
  );

  const [loginMutation, { data: loginData }] = useMutation(gql`
    mutation Login($loginInput: LoginInput!) {
      login(loginInput: $loginInput) {
        _id
        name
        email
      }
    }
  `);

  // const { user } = useUserContext()

  // console.log(user);

  return (
    <>
      <div>CcPage: {JSON.stringify(getMeData)}</div>
      <div>
        <button
          onClick={() => {
            console.log("loginMutation");
            loginMutation({
              variables: {
                loginInput: {
                  email: "vldslv.shumkin@gmail.com",
                  password: "12345678",
                  rememberMe: true,
                },
              },
            });
          }}
        >
          login
        </button>
        <p>{JSON.stringify(loginData)}</p>
        <div>
          {Quizzes &&
            (Quizzes as any).getAllQuizzes.map((quiz: any) => (
              <div key={quiz._id}>
                <h2>{quiz.title}</h2>
                <p>{JSON.stringify(quiz)}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
