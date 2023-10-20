import { Prisma } from "@prisma/client";

type AuthVariant = 'LOGIN' | 'REGISTER';

type StringObject = {
  [key: string]: string;
};

export type { AuthVariant, StringObject };
