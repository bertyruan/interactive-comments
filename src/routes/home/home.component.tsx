import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UsersContext } from "../../context/users.context";
import authUser from "../../utils/firebase/auth.utils";
import "../../styles/utility.scss";
import "./home.styles.scss";
import { Avatar } from "../../assets/assets";

export const Home = () => {
  const { user } = useContext(UsersContext);

  const logoutHandler = () => {
    authUser.userSignOut();
  };

  const isLoggedIn = user.displayName !== "";

  const login = (
    <Link className="button" to={`/auth`}>
      Log in
    </Link>
  );

  const logout = (
    <div className="logout-container flex-row flex-gap-small">
      <img
        alt={"amy robson"}
        className="avatar-normal"
        src={Avatar.amyrobson}
      ></img>
      <span className="username font-color-secondary">{user.displayName}</span>
      <button className="button" onClick={logoutHandler}>
        Log out
      </button>
    </div>
  );

  const authButton = isLoggedIn ? logout : login;

  return (
    <div className="flex-row home-container">
      <div className="flex-margin"></div>
      <main>
        <nav className="nav-container flex-row">
          <Link className="button" to={`/`}>
            Home
          </Link>
          <div>{authButton}</div>
        </nav>
        <br />
        <div>
          <Outlet></Outlet>
        </div>
      </main>
      <div className="flex-margin"></div>
    </div>
  );
};
