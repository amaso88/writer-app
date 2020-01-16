import { DB_CONSTANTS } from "./db-constants";
import BaseService from "./base-service";

class CompanyService extends BaseService {
  constructor(serviceData) {
    super({
      db: serviceData.db,
      refAll: serviceData.db.ref(DB_CONSTANTS.COMPANY.getAll()),
      path: DB_CONSTANTS.COMPANY.getAll()
    });
  }
}

export default CompanyService;
