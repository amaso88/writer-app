import history from "../../config/history";

/**
 * Funcion para cambiar de ruta.
 * @param {String} path Ruta
 */
export const handleLink = (e, path) => {
	e.preventDefault();
	history.push(path);
}

export const goBack = e => {
	if(e) e.preventDefault();
	history.goBack();
}