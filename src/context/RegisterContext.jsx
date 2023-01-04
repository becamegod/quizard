import { Form } from "antd";
import { createContext } from "react";

export const forms = {
  accountForm: Form.useForm(),
  userInfoForm: Form.useForm()
};
export const RegisterContext = createContext();
