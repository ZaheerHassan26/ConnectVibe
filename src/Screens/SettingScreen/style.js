import {StyleSheet} from 'react-native';

import {getThemeColor} from '../ThemeProvider/redux/saga';

export const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: getThemeColor('primary', theme),
    },
    bottomItemView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 15,
    },
    leftBottomView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    bottomText: {
      fontSize: 13,
      fontWeight: '700',
      color: '#3F3F44',
    },
  });


