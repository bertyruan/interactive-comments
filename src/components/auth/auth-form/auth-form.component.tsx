import { ChangeEvent, FormEvent } from "react";

type AuthFormProp = {
  onSubmitCallback: (e: FormEvent<HTMLFormElement>) => void;
  onChangeCallback: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "Login" | "Signup";
  username: string;
};

export const AuthForm = ({
  onChangeCallback,
  onSubmitCallback,
  type,
  username,
}: AuthFormProp) => {
  return (
    <div>
      <form
        className="flex-column flex-gap-normal flex-align-right"
        onSubmit={onSubmitCallback}
      >
        <div className="flex-row flex-gap-large">
          <label className="button-text">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChangeCallback}
          ></input>
        </div>
        <button className="button primary-button" type="submit">
          {type}
        </button>
      </form>
    </div>
  );
};
