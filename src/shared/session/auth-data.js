
export const isAdmin = email => {
	if( email && email === 'cabrerarobles@gmail.com' || email === 'amaso88@gmail.com') {
		return true;
	}
}

export const ROLES = {
	ADMIN: 'admin',
	WRITTER: 'writter'
}