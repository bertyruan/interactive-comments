import { Signin } from "./signin/signin.component";
import { Signup } from "./signup/signup.component";

export const Auth = () => {
  return (
    <div className="flex-row flex-wrap flex-gap-xlarge">
      <Signin></Signin>
      <br></br>
      <Signup></Signup>
    </div>
  );
};
