import { DB_CONSTANTS } from "./db-constants";
import BaseService from "./base-service";

class ProductLineService extends BaseService {
  constructor(serviceData) {
    super({
      db: serviceData.db,
      refAll: serviceData.db.ref(DB_CONSTANTS.PRODUCT_LINE.getAll()),
      path: DB_CONSTANTS.PRODUCT_LINE.getAll()
    });
  }
}

export default ProductLineService;
