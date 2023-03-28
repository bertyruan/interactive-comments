import { createContext, useEffect, useState } from "react";
import { User, UserContext } from "../types/users.types";
import { ChildrenProp } from "../types/generic.types";
import authUser from "../utils/firebase/auth.utils";
import { User as FirebaseUser } from "firebase/auth";
import usersDoc from "../utils/firebase/users.utils";

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
      console.log("authChange", user);
      const currentUser: User = {
        displayName: user.displayName || "",
        email: user.email || "",
      };
      setUser(currentUser);
    } else {
      setUser(getDefaultUser());
    }
  };

  // useEffect(() => {
  //   return authChange;
  // }, []);

  useEffect(() => {
    const authChange = authUser.onAuthStateChangedListener(authChangeHandler);
    const profileChange = usersDoc.onProfileChange(() => {
      console.log("profile change", authUser.auth.currentUser?.email);
      if (authUser.auth.currentUser?.displayName) {
        setUser((u: User) => {
          // console.log("setuser", u);
          return {
            ...u,
            // email: authUser.auth.currentUser?.email || "",
            displayName: authUser.auth.currentUser?.displayName || "",
          };
        });
      }
    });
    return authChange;
  }, []);

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
