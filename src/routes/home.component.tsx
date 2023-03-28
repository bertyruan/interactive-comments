import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UsersContext } from "../context/users.context";
import authUser from "../utils/firebase/auth.utils";

export const Home = () => {
  const { user } = useContext(UsersContext);

  const logoutHandler = () => {
    authUser.userSignOut();
  };

  const isLoggedIn = user.displayName !== "";
  console.log(isLoggedIn, user);
  const login = <Link to={`/auth`}>Log in</Link>;
  const logout = (
    <>
      <span>{user.displayName}</span>
      <button onClick={logoutHandler}>Log out</button>
    </>
  );
  const authButton = isLoggedIn ? logout : login;
  return (
    <>
      <nav>
        <Link to={`/`}>Home</Link>...........{authButton}
      </nav>
      <br />
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};
