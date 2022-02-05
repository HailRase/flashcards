import SuperInputText from "../../../s1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import s from "./ChangePassword.module.css";

const ChangePassword = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <h2 className={s.logo}>it-incubator</h2>
        <h2 className={s.title}>Create New Password</h2>
        <SuperInputText type="password" />
        {/* <p className={s.desc}>
          Create new password and we will send you further
          instructions to email
        </p> */}
        <SuperButton>Change Password</SuperButton>
      </div>
    </div>
  );
};

export default ChangePassword;
