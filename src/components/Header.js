import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {theme} from '../core/theme';

const Header = ({children, color}) => (
  <Text style={[styles.header, {color: color ? color : theme.colors.primary}]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);
