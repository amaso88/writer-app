class AuthManager {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
  }

  setUser = user => {
    if (user !== null) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    this.user = user;
  };
}

export default AuthManager;
