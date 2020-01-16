import { DB_CONSTANTS } from "./db-constants";
import BaseService from "./base-service";

class BrandService extends BaseService {
  constructor(serviceData) {
    super({
      db: serviceData.db,
      refAll: serviceData.db.ref(DB_CONSTANTS.BRAND.getAll()),
      path: DB_CONSTANTS.BRAND.getAll()
    });
  }
}

export default BrandService;
