import { ChangeEvent, FormEvent, useState } from "react";
import authUser from "../../../utils/firebase/auth.utils";
import { redirect, useNavigate } from "react-router-dom";

const defaultFormFields = {
  username: "",
};

export const Signin = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { username } = formField;
  const navigate = useNavigate();

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormField({ ...formField, [name]: value });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      authUser.authUserWithEmailAndPassword(username).then(() => {
        clearFields();
        navigate("/");
      });
    } catch {}
  };

  const clearFields = () => {
    setFormField(() => ({ ...defaultFormFields }));
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChangeHandler}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
