import {THEME_SET} from './types';

export const setTheme = theme => ({
  type: THEME_SET,
  payload: theme,
});
