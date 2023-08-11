import { ChangeEvent, FormEvent, useState } from "react";
import authUser from "../../../utils/firebase/auth.utils";
import { AuthForm } from "../auth-form/auth-form.component";

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
    } catch {}
  };

  return (
    <AuthForm
      onChangeCallback={onChangeHandler}
      onSubmitCallback={onSubmitHandler}
      type="Signup"
      username={username}
    ></AuthForm>
  );
};
