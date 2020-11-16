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
import Header from '../components/Header';
import Button from '../components/Button';
import NfcManager, { NfcTech, NfcEvents, Ndef, NfcAdapter } from 'react-native-nfc-manager';
import ToastExample from '../components/NFCManager';
import Global from '../util/Global';
import FancyModal from '../components/FancyModal';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: "Ready...",
      text: "",
      isVisible: false,
    }
  }
  componentDidMount() {
    NfcManager.start((a) => {
      console.warn(a)
    });
    if (Platform.OS === 'android') {
      NfcManager.getLaunchTagEvent()
        .then(tag => {
          console.warn('launch tag', tag);
          if (tag) {
            this.setState({ tag });
          }
        })
        .catch(err => {
          console.log(err);
        })
      NfcManager.isEnabled()
        .then(enabled => {
          this.setState({ enabled });
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  componentWillUnmount() {
    this._cleanUp();
  }

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
    NfcManager.unregisterTagEvent().catch(() => 0);
    NfcManager.setNdefPushMessage(null)
      .then(() => console.warn('beam cancelled'))
      .catch(err => console.warn(err))
    this.setState({ log: "Ready.." })
  }


  deneme = () => {
    //ToastExample.createNdefMessage("NfcManager")
    let request = {
      //userId: Global.USER._id,
      userToken: Global.USER_TOKEN
    }
    console.warn(request)
    let bytes = Ndef.encodeMessage([Ndef.textRecord(JSON.stringify(request))]);

    NfcManager.setNdefPushMessage(bytes)
      .then(() => console.warn('ready to beam'))
      .catch(err => console.warn(err))

    this.setState({ isVisible: true })
  }

  render() {
    return (
      <Background>
        <Header>NFC</Header>
        <View style={{ height: 100 }}></View>

        <Button mode="outlined" onPress={this.deneme}>
          Open Door
      </Button>
        <Button mode="outlined" onPress={this._cleanUp}>
          Cancel
      </Button>
        <View style={styles.log}>
          <Text>{this.state.log}</Text>
        </View>
        <FancyModal isVisible={this.state.isVisible}
          onPress={() => {
            this._cleanUp();
            this.setState({ isVisible: false })
          }} />
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
_runTest = textToWrite => {
    const cleanUp = () => {
      this.setState({ isTestRunning: false });
      NfcManager.closeTechnology()
      NfcManager.unregisterTagEvent();
    }

    const parseText = (tag) => {
      if (tag.ndefMessage) {
        console.warn(tag.ndefMessage)
        return NdefParser.parseText(tag.ndefMessage[0]);
      } else {
        console.warn("yok")
        return null;
      }

    }
    NfcManager.registerTagEvent(tag => console.warn(tag))
      .then(() => NfcManager.requestTechnology(NfcTech.Ndef))
      .then(() => NfcManager.getNdefMessage())
      .then(tag => {
        let parsedText = parseText(tag);
        this.setState({ tag, parsedText })
        console.log(parsedText)
      })
      .then(() => NfcManager.writeNdefMessage(buildTextPayload(textToWrite)))
      .then(cleanUp)
      .catch(err => {
        console.warn(err);
        cleanUp();
      })
  }
*/

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
