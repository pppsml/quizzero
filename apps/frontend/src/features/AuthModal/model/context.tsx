import { Dispatch, ReactNode, SetStateAction, createContext, useContext } from "react";

import { LoginForm} from '../ui/LoginForm'
import { RegistrationForm } from "../ui/RegistrationForm";

export enum FORMS_ENUM {
  LOGIN = "LOGIN",
  REGISTRATION = "REGISTRATION",
  FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

export type IForms = {
  [key in FORMS_ENUM]: ReactNode;
}

export const Forms: IForms = {
  LOGIN: <LoginForm />,
  REGISTRATION: <RegistrationForm />,
  FORGOT_PASSWORD: <p>FORGOT_PASSWORD FORM</p>,
}

interface AuthModalContext {
  currentForm: keyof IForms;
  setCurrentForm: Dispatch<SetStateAction<FORMS_ENUM>>;
  closeModal: () => void;
}

export const AuthModalContext = createContext<AuthModalContext>({
  currentForm: FORMS_ENUM.LOGIN,
  setCurrentForm: () => {},
  closeModal: () => {},
})

export const useAuthModalContext = () => useContext(AuthModalContext)