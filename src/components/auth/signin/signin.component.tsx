import { ChangeEvent, FormEvent, useState } from "react";
import authUser from "../../../utils/firebase/auth.utils";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../auth-form/auth-form.component";

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
    <AuthForm
      onChangeCallback={onChangeHandler}
      onSubmitCallback={onSubmitHandler}
      type="Login"
      username={username}
    ></AuthForm>
  );
};
