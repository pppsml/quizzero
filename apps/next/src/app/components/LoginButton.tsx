"use client";

import { useMutation, gql } from "@apollo/client";

export default function LoginButton() {
  const [loginMutation, { data: loginData }] = useMutation(gql`
    mutation Login($loginInput: LoginInput!) {
      login(loginInput: $loginInput) {
        _id
        name
        email
      }
    }
  `);

  return (
    <>
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
    </>
  );
}
