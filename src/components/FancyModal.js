import React, { memo } from 'react';
import { StyleSheet, Button, View, Image } from 'react-native';
import Modal from 'react-native-modal';



const FancyModal = ({ isVisible, style, onPress, ...props }) => (
  <View style={styles.view}>
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      backdropColor="#072c14"
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>

      <View style={styles.content}>
        <Image style={styles.image} source={require('../assets/nfcGif.gif')} />
        <Button testID={'close-button'} onPress={() => onPress()} title="Close" />
      </View>
    </Modal>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});


export default memo(FancyModal);
