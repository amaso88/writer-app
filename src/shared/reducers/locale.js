import { Storage } from "../storage";

export const ACTION_TYPES = {
  SET_LOCALE: 'locale/SET_LOCALE'
};

const initialState = {
  currentLocale: 'en'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOCALE:
      const currentLocale = action.payload;
      return {
        currentLocale
      };
    default:
      return state;
  }
};

export const setLocale = locale => async dispatch => {
  Storage.session.set('locale', locale);
  dispatch({
    type: ACTION_TYPES.SET_LOCALE,
    payload: locale
  });
};
