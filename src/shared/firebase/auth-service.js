import { isAdmin, ROLES } from "../session/auth-data";

class AuthService {
  constructor(serviceData) {
    this.auth = serviceData.auth;
    this.googleProvider = serviceData.googleProvider;
  }

  // *** Auth API ***
  loginWithGoogle = () => {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithPopup(this.googleProvider)
        .then(socialAuthUser => {
          const userTemp = {
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            id: socialAuthUser.user.uid,
            roles: isAdmin(socialAuthUser.user.email)
              ? ROLES.ADMIN
              : ROLES.WRITTER
          };
          resolve(userTemp);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      this.auth
        .signOut()
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}
export default AuthService;
