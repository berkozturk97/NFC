import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import NfcManager, { NfcTech, NfcEvents } from 'react-native-nfc-manager';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: "Ready...",
      text: ""
    }
  }
  componentDidMount() {
    NfcManager.start((a) => {
      console.warn(a)
    });

    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.warn('Card ID:', tag.id);
      this.setState({ log: "Card ID: " + tag.id })
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    this._cleanUp();
  }

  _cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
    this.setState({ log: "Ready.." })
  }

  _test = async () => {
    try {
      await NfcManager.registerTagEvent();
      this.setState({ log: "You can read now.." })
    } catch (ex) {
      console.warn('ex', ex);

      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
    this.setState({ log: "Ready.." })
  }


  onChangeText = (text) => {
    this.setState({
      text
    })
  }

  render() {
    return (
      <Background>

        <Header>NFC</Header>
        <View style={{ height: 100 }}></View>

        {/* <TextInput
          style={styles.textInput}
          onChangeText={this.onChangeText}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#888888"
          placeholder="Enter text here" />

        <Button mode="outlined" onPress={this.writeData}>
          Write
        </Button>*/}
        <Button mode="outlined" onPress={this._test}>
          Read
      </Button>
        <Button mode="outlined" onPress={this._cancel}>
          Cancel
      </Button>

        <View style={styles.log}>
          <Text>{this.state.log}</Text>
        </View>
      </Background>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    textAlign: 'center',
    color: 'black'
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235'
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B'
  },
  buttonText: {
    color: '#ffffff'
  },
  log: {
    marginTop: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default memo(Dashboard);


/*
 readData = async () => {
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!'
      });
      console.warn("asdAS23423423D")
      let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

      resp = await cmd([0x3A, 4, 4]);
      console.warn("resp1: " + resp)
      let payloadLength = parseInt(resp.toString().split(",")[1]);
      let payloadPages = Math.ceil(payloadLength / 4);
      let startPage = 5;
      let endPage = startPage + payloadPages - 1;

      resp = await cmd([0x3A, startPage, endPage]);
      console.warn("resp2: " + resp)
      bytes = resp.toString().split(",");
      console.warn("bytes: " + bytes)
      let text = "";

      for (let i = 0; i < bytes.length; i++) {
        if (i < 5) {
          continue;
        }

        if (parseInt(bytes[i]) === 254) {
          break;
        }

        text = text + String.fromCharCode(parseInt(bytes[i]));

      }

      this.setState({
        log: text
      })

      this._cleanUp();
    } catch (ex) {
      this.setState({
        log: ex.toString()
      })
      this._cleanUp();
    }
  }

  writeData = async () => {
    if (!this.state.text) {
      Alert.alert("Nothing to write");
      return;
    }
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to do some custom Mifare cmd!'
      });

      let text = this.state.text;
      let fullLength = text.length + 7;
      let payloadLength = text.length + 3;

      let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

      resp = await cmd([0xA2, 0x04, 0x03, fullLength, 0xD1, 0x01]); // 0x0C is the length of the entry with all the fluff (bytes + 7)
      resp = await cmd([0xA2, 0x05, payloadLength, 0x54, 0x02, 0x65]); // 0x54 = T = Text block, 0x08 = length of string in bytes + 3

      let currentPage = 6;
      let currentPayload = [0xA2, currentPage, 0x6E];

      for (let i = 0; i < text.length; i++) {
        currentPayload.push(text.charCodeAt(i));
        if (currentPayload.length == 6) {
          resp = await cmd(currentPayload);
          currentPage += 1;
          currentPayload = [0xA2, currentPage];
        }
      }

      // close the string and fill the current payload
      currentPayload.push(254);
      while (currentPayload.length < 6) {
        currentPayload.push(0);
      }

      resp = await cmd(currentPayload);

      this.setState({
        log: resp.toString()
      })

      this._cleanUp();
    } catch (ex) {
      this.setState({
        log: ex.toString()
      })
      this._cleanUp();
    }
  }
*/
