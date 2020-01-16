import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { DB_CONSTANTS } from "./db-constants";
import AuthService from "./auth-service";
import UserService from "./user-service";
import BrandService from "./brand-service";
import ProductLineService from "./product-line-service";
import ProductService from "./product-service";
import CompanyService from "./company-service";

const fbConfig = {
  apiKey: "AIzaSyDInxcKjFND6CPzzrqfpDUJwfBgFHAPJJU",
  authDomain: "writter-app-management.firebaseapp.com",
  databaseURL: "https://writter-app-management.firebaseio.com",
  projectId: "writter-app-management",
  storageBucket: "writter-app-management.appspot.com",
  messagingSenderId: "904791426685",
  appId: "1:904791426685:web:45c2edf19ecf22bca01314",
  measurementId: "G-WR58CXQRLF"
};
class Firebase {
  constructor() {
    app.initializeApp(fbConfig);

    this.auth = app.auth();
    this.db = app.database();
    this.googleProvider = new app.auth.GoogleAuthProvider();

    this.authService = new AuthService({
      auth: this.auth,
      googleProvider: this.googleProvider,
      db: this.db
    });

    this.userService = new UserService({
      db: this.db
    });

    this.brandService = new BrandService({
      db: this.db
    });

    this.productLineService = new ProductLineService({
      db: this.db
    })

    this.productService = new ProductService({
      db: this.db
    })

    this.companyService = new CompanyService({
      db: this.db
    })

    this.services = {
      auth: this.authService,
      user: this.userService,
      brand: this.brandService,
      productLine: this.productLineService,
      product: this.productService,
      company: this.companyService
    };

    
  }

  getService = service => this.services[service];

  // *** Auth API ***
  loginWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  logout = () => this.auth.signOut();

  // *** User API ***
  // users = () => this.db.ref(DB_CONSTANTS.USER.getAll());
  // user = uid => this.db.ref(DB_CONSTANTS.USER.getOne(uid));
}
export default Firebase;
