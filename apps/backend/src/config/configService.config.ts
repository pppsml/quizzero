import { ConfigModuleOptions } from "@nestjs/config";

export interface ConfigServiceVariables {
  PORT: number;

  MONGODB_URI: string;
  BACKEND_URI: string;
  FRONTEND_URI: string;
  OAUTH_REDIRECT_URI: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  SESSION_SECRET: string;

  NODEMAILER_NAME: string;
  NODEMAILER_EMAIL: string;
  NODEMAILER_PASSWORD: string;

  NODEMAILER_TRANSPORT_HOST: string;
  NODEMAILER_TRANSPORT_PORT: number;
}

export const getConfigModuleOptions = (): ConfigModuleOptions => ({
  envFilePath: `.env.development.local`,
  isGlobal: true,
})