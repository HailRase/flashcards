import { instance } from "./instance";

export const PasswordAPI = {
  changePassword(password: string, resetPasswordToken: string) {
      return instance.post(`auth/set-new-password`, { password, resetPasswordToken })
  },
  recoverPassword(email: string, from: string) {
      const message = `<div style="background-color: lime; padding: 15px">
          password recovery link: 
          <a href='${process.env.REACT_APP_APP_ADDRESS}#/change/$token$'>
          link</a></div>` ;
      return instance.post(`auth/forgot`, { email, from, message });
  },
}