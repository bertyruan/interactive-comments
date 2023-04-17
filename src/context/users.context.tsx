import { createContext, useEffect, useState } from "react";
import { User, UserContext } from "../types/users.types";
import { ChildrenProp } from "../types/generic.types";
import authUser from "../utils/firebase/auth.utils";
import { User as FirebaseUser } from "firebase/auth";

const getDefaultUser: () => User = () => ({
  displayName: "",
  email: "",
});

export const UsersContext = createContext<UserContext>({
  user: getDefaultUser(),
});

export const UsersProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState(getDefaultUser());
  const value: UserContext = { user };

  const authChangeHandler = (user: FirebaseUser | null) => {
    if (user) {
      const displayName = user.displayName
        ? user.displayName
        : user.email
        ? user.email.split("@")[0].toString()
        : "";
      const currentUser: User = {
        displayName,
        email: user.email || "",
      };
      setUser(currentUser);
    } else {
      setUser(getDefaultUser());
    }
  };

  useEffect(() => {
    const authChange = authUser.onAuthStateChangedListener(authChangeHandler);
    return authChange;
  }, []);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
