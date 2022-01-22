import { UserRole } from "./enums";

export const Auth = {
  PASSWORD_MISMATCH: `Incorrect password`,
  USER_NOT_FOUND: `No such user found`,
  MISSING_AUTHENTICATION: `Missing Authentication`,
  UNAUTHORIZED: `You are not allowed to access this resource`,
};
export const defaultData = [
  {
    id: 1, name: "James", email: "james@123.com", password: "1!23#4", role: UserRole[UserRole.EMPLOYEE],
  },
  {
    id: 2, name: "Peter", email: "peter@123.com", password: "8^23!3", role: UserRole[UserRole.EMPLOYEE],
  },
  {
    id: 3, name: "John", email: "john@123.com", password: "98#891", role: UserRole[UserRole.ADMIN],
  },
  {
    id: 4, name: "Fred", email: "fred@123.com", password: "68651", role: UserRole[UserRole.ADMIN],
  },
];
