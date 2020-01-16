import { DB_CONSTANTS } from "./db-constants";
import BaseService from "./base-service";

class ProductService extends BaseService {
  constructor(serviceData) {
    super({
      db: serviceData.db,
      refAll: serviceData.db.ref(DB_CONSTANTS.PRODUCT.getAll()),
      path: DB_CONSTANTS.PRODUCT.getAll()
    });
  }
}

export default ProductService;