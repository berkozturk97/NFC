import React, {memo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from '../core/theme';
const {width} = Dimensions.get('window');

const DoorCard = ({
  doorName,
  doorItem,
  mode = 'outlined',
  style,
  children,
  ...props
}) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: theme.colors.surface},
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}>
    {doorName}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: width / 2.5,
    height: width / 2.5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
  },
});

export default memo(DoorCard);
