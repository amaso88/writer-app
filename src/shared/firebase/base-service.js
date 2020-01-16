import moment from "moment";

class BaseService {
  constructor(serviceData) {
    this.db = serviceData.db;

    /**
     * baseRef es la variable que almacena la referencia principal de la entidad
     */
    this.refAll = serviceData.refAll;

    this.pathAll = serviceData.path;
  }

  /**
   * Funcion que retorna la referencia base de la entidad
   */
  getRefAll() {
    return this.refAll;
  }

  /**
   * Funcion que retorna la referencia de una entidad hija por su uid
   * @param {String} uid Clave primaria
   */
  getRefOne(uid) {
    return this.db.ref(`${this.pathAll}/${uid}`);
  }

  /**
   * Funcion que retorna un query customizada
   * @param {Object} queryAttr Objeto que contiene los diferentes tipos de queries
   */
  getCustomQuery(queryAttr = null) {
    if (!queryAttr) {
      return this.refAll;
    }
    let customRef = this.refAll;
    if (queryAttr.limitLast) {
      customRef = customRef.limitToLast(queryAttr.limitLast);
    }
    if (queryAttr.limitFirst) {
      customRef = customRef.limitToFirst(queryAttr.limitFirst);
    }
    if (queryAttr.startAt) {
      customRef = customRef.startAt(queryAttr.startAt);
    }
    if (queryAttr.endAt) {
      customRef = customRef.endAt(queryAttr.endAt);
    }
    if (queryAttr.orderByChild) {
      customRef = customRef.orderByChild(queryAttr.orderByChild);
    }
    if (queryAttr.equalTo) {
      customRef = customRef.equalTo(queryAttr.equalTo);
    }

    return customRef;
  }

  /**
   * Funcion que devuelve todos los datos que existan en la query especificada
   * @param {Firebase.query} query Query que contiene la referencia a los datos
   */
  getAll(query = null) {
    return new Promise((resolve, reject) => {
      let currentRef = query ? this.getCustomQuery(query) : this.refAll;
      currentRef.on(
        "value",
        snapshot => {
          const itemsObject = snapshot.val();
          const itemsList = itemsObject
            ? Object.keys(itemsObject).map(key => ({
                ...itemsObject[key],
                uid: key
              }))
            : [];
          resolve(itemsList);
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  /**
   * Funcion que retorna el total de datos que existan en la query especificada
   * @param {Firebase.query} query Query que contiene la referencia a los datos
   */
  getCountAll(query = null) {
    return new Promise((resolve, reject) => {
      let currentRef = query ? this.getCustomQuery(query) : this.refAll;
      currentRef
        .once("value")
        .then(snapshot => {
          resolve(snapshot.numChildren());
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  /**
   * Funcion para crear un elemento
   * @param {Object} item Objeto a insertar
   * @param {Uid} userId Clave del usuario
   */
  createItem(item, userId) {
    return new Promise((resolve, reject) => {
      // Get a key for a new Item.
      var uid = this.refAll.push().key;
      item.created = moment.now();
      item.updated = moment.now();
      item.createdBy = userId;
      this.getRefOne(uid).set(item, error => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * Funcion para crear un elemento
   * @param {Object} item Objeto a insertar
   * @param {Uid} uid Clave del elemento
   */
  updateItem(item, uid) {
    return new Promise((resolve, reject) => {
      item.updated = moment.now();
      this.getRefOne(uid).set(item, error => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  /**
   * Funcion que retorna el elemento de acuerdo a la clave
   * @param {Uid} uid Clave del elemento
   */
  getItem(uid) {
    return new Promise((resolve, reject) => {
      this.getRefOne(uid)
        .once("value")
        .then(snapshot => {
          const item = snapshot.val();
          resolve(item);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  /**
   * Funcion que elimina a un elemento
   * @param {Uid} uid Clave del elemento
   */
  removeItem(uid) {
    return new Promise((resolve, reject) => {
      this.getRefOne(uid).remove(error => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("eliminado correctamente!!!");
          resolve(true);
        }
      });
    });
  }
}

export default BaseService;
