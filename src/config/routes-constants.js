export const ROUTES_CONSTANTS = {
  HOME: "/",
  AUTH: {
    LOGIN: "/login"
  },
  COMPANY: {
    index: () => '/company',
    create: () => '/company/create',
    view: uid => `/company/view/${uid}`,
    edit: uid => `/company/edit/${uid}`,
    delete: uid => `/company/delete/${uid}`,
  },
  PRODUCT_LINE: {
    index: () => '/product_line',
    create: () => '/product_line/create',
    view: uid => `/product_line/view/${uid}`,
    edit: uid => `/product_line/edit/${uid}`,
    delete: uid => `/product_line/delete/${uid}`,
  },
  BRAND: {
    index: () => '/brand',
    create: () => '/brand/create',
    view: uid => `/brand/view/${uid}`,
    edit: uid => `/brand/edit/${uid}`,
    delete: uid => `/brand/delete/${uid}`,
  },
  PRODUCT: {
    index: () => '/product',
    create: () => '/product/create',
    view: uid => `/product/view/${uid}`,
    edit: uid => `/product/edit/${uid}`,
    delete: uid => `/product/delete/${uid}`,
    html: uid => `/product/html/${uid}`,
  } 
};
