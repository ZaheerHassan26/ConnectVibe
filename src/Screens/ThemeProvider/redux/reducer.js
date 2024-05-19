import {THEME_SET} from './types';

const initialState = {
  theme: 'default',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case THEME_SET:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};
