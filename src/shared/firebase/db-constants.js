
export const DB_CONSTANTS = {
	COMPANY : {
		getAll: () => 'companies',
		getOne: uid => `companies/${uid}`
	},
	PRODUCT_LINE : {
		getAll: () => 'product_lines',
		getOne: uid => `product_lines/${uid}`
	},
	BRAND : {
		getAll: () => 'brands',
		getOne: uid => `brands/${uid}`
	},
	PRODUCT : {
		getAll: () => 'products',
		getOne: uid => `products/${uid}`
	},
	USER : {
		getAll: () => 'users',
		getOne: uid => `users/${uid}`
	}
}