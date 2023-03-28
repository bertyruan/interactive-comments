import { User as FirebaseUser } from "firebase/auth";

export type User = {
  displayName: string;
  email: string;
};

export type UserContext = {
  user: User;
};

export const getDefaultUser = (): User => ({
  displayName: "",
  email: "",
});
