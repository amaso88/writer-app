import { DB_CONSTANTS } from "./db-constants";
import BaseService from "./base-service";

class UserService extends BaseService {
  constructor(serviceData) {
    super({
      db: serviceData.db,
      refAll: serviceData.db.ref(DB_CONSTANTS.USER.getAll()),
      path: DB_CONSTANTS.USER.getAll()
    });
  }
}

export default UserService;
