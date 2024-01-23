export interface ConfigServiceVariables {
  PORT: number;

  MONGODB_URI: string;
  FRONTEND_URL: string;
  FRONTEND_ENDPOIND_VERIFY: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;

  JWT_PRIVATE_KEY: string;
  JWT_PUBLIC_KEY: string;

  SESSION_SECRET: string;

  NODEMAILER_NAME: string;
  NODEMAILER_EMAIL: string;
  NODEMAILER_PASSWORD: string;

  NODEMAILER_TRANSPORT_HOST: string;
  NODEMAILER_TRANSPORT_PORT: number;
}