import { ChangeEvent, FormEvent, useState } from "react";
import authUser from "../../../utils/firebase/auth.utils";

const defaultFormFields = {
  username: "",
};

export const Signup = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { username } = formField;

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormField({ ...formField, [name]: value });
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      authUser.newUserWithEmailAndPassword(username).then(() => {
        setFormField(defaultFormFields);
      });
    } catch {
      console.log("lol");
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChangeHandler}
      ></input>
      <button type="submit">Signup</button>
    </form>
  );
};
