import { ChangeEvent, useState } from "react";
import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import s from "./ChangePassword.module.css";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const onNewPasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(e.currentTarget.value);
  };

  const onSubmit = () => {
    alert(`New Password Set: ${newPassword}`);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.logo}>it-incubator</h2>
        <h2 className={s.title}>Create New Password</h2>
        <SuperInputText
          type="password"
          value={newPassword}
          onChange={onNewPasswordChange}
        />
        <SuperButton onClick={onSubmit}>
          Change Password
        </SuperButton>
      </div>
    </div>
  );
};

export default ChangePassword;
