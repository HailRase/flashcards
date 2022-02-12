import { instance } from "./instance"

export const authAPI = {
  register(email: string, password: string, repeatPassword: string) {
      return instance.post(`auth/register`, { email, password, repeatPassword })
  },
  Login(email: string, password: string, rememberMe: boolean) {
      return instance.post(`auth/login`, { email, password, rememberMe })
  },
  logout(){
      return instance.delete('auth/me')
  },
  me() {
      return instance.post(`auth/me`)
  },

}